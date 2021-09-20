import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import  InfoBox  from '../../components/infoBox'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getUser } from '../../storage/utils'
import Comments from '../../components/Comments'
import { FiTrash } from 'react-icons/fi'
import StyledLink from '../../components/Link/Link'
import './Post.css'


export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ errorComments, setErrorComments ] = useState(null)
    const { id } = useParams()
    const [ comment, setComment ] = useState('')
    const token = getToken()
    const navigate = useNavigate()
    const [date, setDate] = useState(null)

    useEffect(async ()=>{
        let isCancelled = false
        console.log(token)
        const response = await api.get(`/post/${id}`).catch((error)=> {
            setError(error.message)})
            
        if(!isCancelled){
            console.log(response.data.authorId.user.length)         
            setData(response.data)
            setDate(new Date(response.data.communityId.date))}
        return () => {
            isCancelled = true
        }
    }, [])

    async function handleSubmit(){
        await api.post('/comment/register', { token, id, comment }).catch((error)=>setError(error.message))
        .catch((error) =>{ setErrorSubmit(error.message) })
        window.location.reload()
    }

    async function handleDelete(){

       const response = await api.post(`/post/deletePost`, {id, token}).catch((error) =>{ setError(error.message)})
        navigate(`/community/${response.data.id}/1`)
    }

    if(!data || !date) return(<h1>{error}</h1>)

    return(
        <div className='pageBody'>
            <div className='postDiv'>
                {  
                    <div className='postBody'>
                        
                            <div className='header'>
                                <h2>{data.title}</h2>
                                { data.authorId.user == getUser() ? <button onClick={handleDelete} className='trashButton'> <FiTrash /> </button> : <span>{data.authorId.user}</span>}
                            </div>
                            { !data.url ? <span>{data.body}</span> : <img className='postImg' src={data.url} />}

                       
                        <div className='author'> <StyledLink to={`/profile/${data.authorId.user}`} ><span>{data.authorId.user}</span></StyledLink></div>
                    </div>

                }
                <div className='commentForm'>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            id="comment"
                            rows='5'
                            type="textarea"
                            name="comment"
                            placeholder="Comentário"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    <button className="button" type="submit">Comentar</button>
                    {errorSubmit && <><small style={{ color: 'red' }}>{errorSubmit}</small><br /></>}
                    </form>
                </div>
                <div className='commentsBox'>
                {
                   
                    <div className='comment'>
                        <Comments id={id}/>
                    </div>  
                } 
                </div>
            </div>
            
            <InfoBox community={data.communityId}/>

        </div>

    )
}