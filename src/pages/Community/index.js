import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import { useParams, Link } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getSubs, isLogged, removeSub, setSubs } from '../../storage/utils'
import InfoBox from '../../components/infoBox'
import './Community.css'



export default function Community(props){


    const [ logged, setLogged ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ errorData, setErrorData ] = useState(null)
    const [ errorPosts, setErrorPosts ] = useState(null)
    const [ data, setData ] = useState({})
    const [ posts, setPosts ] = useState({})
    const [ subscribed, setSub] = useState(false)
    const { id } = useParams()
    const token = getToken()
    const  [ title, setTitle ] = useState('')
    const  [ body, setBody ] = useState('')
    const navigate = useNavigate()


     useEffect(async ()=>{
        let isCancelled = false
        const subs = getSubs()
        
        if(token) setSub(subs.includes(id))

        await api.get(`community/${id}`).then((response)=>{
            
            if(!isCancelled){
                setData(response.data["Community"])
                setPosts(response.data['Posts'])
            }

        }).catch((error) => setErrorData(error.response.data.message))
        return () => {
            isCancelled = true
        }
    }, [])

    async function sub(){
        console.log('here')
        
        api.post('/community/sub',{ token, id }).then((response) => {
            setSubs(response.data.subs)
            setSub(!subscribed)
        }).catch((e)=>{setError(e)})        
    }

    async function handleSubmit(e){

        if(title == '' || body == '') return setError('Post fields cannot be empty!')

        e.preventDefault()

        if(token == null) setError("You must be logged to post something!")
        try {
            await api.post('/post/register', { title, body, token, id  })
            navigate('/')
        } catch (e) {
            setError(e.response.data.message)
        }
    }

    if(errorData) return( <h1>{errorData}</h1> )

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }

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
            rows='5'
            value={body}
            placeholder='Body'
            onChange = { e => setBody(e.target.value) }
            />
            <button  disabled={isLogged()}>Post</button>
            </form>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            
            <div className='posts'>
                { 
                  errorPosts ? <h1>{errorPosts}</h1> : Array.from(posts).map((post) => (
                        <div key={post._id} className='post'>
                            <Link to={`/post/${post._id}`}><span>{post.title}</span></Link>
                            <p>{post.body}</p>
                            <footer>
                                <span>by {post.authorId.user} </span>
                                <span> at {getDate(post.date)}</span>
                            </footer>
                        </div>
                    ))
                }
            </div>
            <InfoBox community={data}/>
                   
        </div>
        
    )

}
