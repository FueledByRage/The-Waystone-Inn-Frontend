import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import  InfoBox  from '../../components/infoBox'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getUser } from '../../storage/utils'
import Comments from '../../components/Comments'
import  { PostBox }  from '../../components/PostBox'
import { CommentsBox, Container, StyledLink, StyledForm } from './style'
import { AlertBox } from '../../components/Alert'
import { FiThumbsUp, FiThumbsDown, FiTrash } from 'react-icons/fi'
import { LikeBox } from '../../components/likeBox'
import { ErrorBox } from '../Community/style'



export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()
    const [ comment, setComment ] = useState('')
    const navigate = useNavigate()
    const [date, setDate] = useState(null)
    
    useEffect(async ()=>{
        try {
            const user = getUser()
            let isCancelled = false
            const response = await api.get(`/post/${id}/${user || 'nl'}`).catch((error)=> {
                throw Error(error.response.data)
            })
                              
            if(!isCancelled){     
                setData(response.data)
                setDate(new Date(response.data.post.communityId.date))}
                setLoading(false)
                isCancelled = true
            } catch (error) {
                setError(error.message)
                setLoading(false)
        }
    }, [])
    
    async function handleSubmit(){
        await api.post('/comment/register', { id, comment })
        .catch((error) =>{ 
            setErrorSubmit(error.response.data)
        })
        
    }

    async function handleDelete(){
       const response = await api.post(`/post/deletePost`, { id }).catch((error) =>{ setError(error.message)})
        navigate(`/community/${response.data.post.id}/1`)
    }

    if(loading) return ( <h1>Loading...</h1> )

    return(

        <Container>
            {   

                error ? <AlertBox><span>{error}</span></AlertBox>  : 
                    <PostBox>
                        <LikeBox> <FiThumbsUp /><span>{data.post.likes || 0}</span> <FiThumbsDown /></LikeBox>
                        <div className='title'>
                            <h1>{ data.post.title}</h1>
                            {data.post.authorId.user == getUser() ? <button onClick={handleDelete} style={{width: '80px',}} ><FiTrash/></button> : <span></span>}
                        </div>
                        <div className='postBody' > {data.post.url ? <img src={data.post.url} /> : <span>{data.post.body}</span> } </div>
                        <div className='footer'><StyledLink to={`/community/${data.post.communityId._id}/1`}> {data.post.communityId.name} </StyledLink> {<StyledLink  to={`/profile/${data.post.authorId.user}`} > {data.post.authorId.user} </StyledLink> }</div>
                    </PostBox>
            }
            <CommentsBox>
                <StyledForm onSubmit={handleSubmit}>
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
                </StyledForm>
                {errorSubmit && <AlertBox><span>{errorSubmit}</span></AlertBox>}
                <Comments id={id}/> 
            </CommentsBox>
            <div className='aside'>
                {
                    !error ?? <InfoBox community={data.post.communityId}/>
                }
            </div>
        </Container> 

    )
}