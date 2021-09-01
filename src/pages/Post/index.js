import React, { useEffect, useState, setState }from 'react'
import { useNavigate } from 'react-router'
import  InfoBox  from '../../components/infoBox'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getUser } from '../../storage/utils'
import Comments from '../../components/Comments'
import { FiTrash } from 'react-icons/fi'
import './Post.css'


export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ errorComments, setErrorComments ] = useState(null)
    const { id } = useParams()
    const [ comments, setComments ] = useState(null)
    const [ comment, setComment ] = useState('')
    const token = getToken()
    const navigate = useNavigate()
    const [date, setDate] = useState(null)

    useEffect(async ()=>{
        let isCancelled = false
        const response = await api.get(`/post/${id}`).catch((error)=> {
            setError(error.message)})
        if(!isCancelled){            
            setData(response.data)
            setDate(new Date(response.data.communityId.date))}
        return () => {
            isCancelled = true
        }
    }, [])

    async function handleSubmit(){
        await api.post('/comment/register', { token, id, comment }).catch((error)=>setError(error.message))
        window.location.reload()
    }

    async function handleDelete(){

       const response = await api.delete(`/post/deletePost/${id}`).catch((error) =>{ setError(error.message)})
        navigate(`/${response.data.id}`)
    }

    if(!data || !date) return(<h1>{error}</h1>)

    return(
        <div className='pageBody'>
            <div className='postDiv'>
                {  
                    <div className='postBody'>
                        <div> 
                            <div className='header'>
                                <h3>{data.title}</h3>
                                { toString(data.authorId.user) == toString(getUser()) ? <button onClick={handleDelete} className='trashButton'> <FiTrash /> </button> : <span>{data.authorId.user}</span>}
                            </div>
                            <span>{data.body}</span>
                        </div>
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
                    comments ? <h1>{'Theres no comments'}</h1> : 
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