import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getSubs, isLogged, setSubs } from '../../storage/utils'
import InfoBox from '../../components/infoBox'
import './Community.css'
import Upload from '../../components/Upload'
import { DropContainer } from '../../components/Upload/DropContainer'



export default function Community(props){

    const [ error, setError ] = useState(null)
    const [ errorData, setErrorData ] = useState(null)
    const [ errorPosts, setErrorPosts ] = useState(null)
    const [ data, setData ] = useState({})
    const [ posts, setPosts ] = useState({})
    const [ subscribed, setSub] = useState(false)
    const { id, page } = useParams()
    const token = getToken()
    const  [ title, setTitle ] = useState('')
    const  [ body, setBody ] = useState('')
    const [file, setFile ] = useState(null)
    const [loading, setLoading ] = useState(null)
    const navigate = useNavigate()
    let isLastPage
    let parsePage = parseInt(page)


     useEffect(async ()=>{
        let isCancelled = false
        const subs = getSubs()
        
        if(token) setSub(subs.includes(id))

        await api.get(`/community/${id}/${parsePage}`).then((response)=>{
            
            if(!isCancelled){
                setData(response.data['Community'])
                setPosts(response.data['Posts'])
                isLastPage = response.data['lastPage']
            }

        }).catch((error) => setErrorData(error.response.data.message))
        return () => {
            isCancelled = true
        }
    }, [])

    async function sub(){
        
        api.post('/community/sub',{ token, id }).then((response) => {
            setSubs(response.data.subs)
            setSub(!subscribed)
        }).catch((e)=>{setError(e)})        
    }

    async function handleSubmit(e){


        if(title == '' || body == '') return setError('Post fields cannot be empty!')



        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('body', body)
        formData.append('token', token)
        formData.append('id', id)
        formData.append('file', file)

        if(!isLogged()) setError("You must be logged to post something!")
        try {
            const response = await api.post('/post/register', formData).catch((error) =>{ throw error })
            navigate(`/post/${response.data._id}`)
        } catch (error) {
            setError(error.message)
        }
    }

    function handleNavegate(c){
        parsePage += c
        navigate(`/community/${id}/${parsePage}`)
        window.location.reload()
    }

    if(errorData) return( <h1>{errorData}</h1> )

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    
    function handleFile(files){ setFile(files[0]) }



    return(
        <div className='communityBody'>
            <header>
                <div>
                    <h1>{data.name}</h1>
                    <button disabled={isLogged()} onClick={sub}>{ subscribed ? 'unsub' : 'sub'}</button>
                </div>
            </header>
            
            <form className = 'postForm' onSubmit={handleSubmit}>
            <input 
            type='text'
            value={title}
            placeholder='Title'
            onChange = {e => setTitle(e.target.value)}
            />
            <textarea
            disabled={file}
            rows='5'
            value={body}
            placeholder='Body'
            onChange = { e => setBody(e.target.value) }
            />
            {file ? <DropContainer> { file.name } </DropContainer> : <Upload onUpload={handleFile}/>}
            <button disabled={isLogged() || loading}>Post</button>
            </form>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            
            <div className='posts'>
                { 
                  errorPosts ? <h1>{errorPosts}</h1> : Array.from(posts).map((post) => (
                        <div key={post._id} className='post'>
                            <Link to={`/post/${post._id}`}><span>{post.title}</span></Link>
                            { !post.url ? <p>{post.body}</p> : <img className='postImg' src={post.url}/>}
                            <footer>
                                <span>by {post.authorId.user} </span>
                                <span> at {getDate(post.date)}</span>
                            </footer>
                        </div>
                    ))
                }
                <footer className='buttons'><button disabled = { parsePage == 1 } onClick={() => handleNavegate(-1)} >Previous</button> <button className='next' disabled = { isLastPage } onClick={() => handleNavegate(1)} >Next</button> </footer>
            </div>
            <InfoBox community={data}/>
                   
        </div>
        
    )

}
