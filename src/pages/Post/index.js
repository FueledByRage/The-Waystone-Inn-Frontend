import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import  InfoBox  from '../../components/infoBox'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getUser } from '../../storage/utils'
import Comments from '../../components/Comments'
import  { PostBox }  from '../../components/PostBox'
import { CommentsBox, Container, StyledLink, StyledForm } from './style'
import { AlertBox } from '../../components/Alert'
import { FiArrowDown, FiArrowUp, FiTrash } from 'react-icons/fi'



export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ errorComments, setErrorComments ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()
    const [ comment, setComment ] = useState('')
    const token = getToken()
    const navigate = useNavigate()
    const [date, setDate] = useState(null)
    
    useEffect(async ()=>{
        try {
            let isCancelled = false
            const response = await api.get(`/post/${id}`).catch((error)=> {
                throw Error(error.response.data)
            })                    
            if(!isCancelled){     
                setData(response.data)
                setDate(new Date(response.data.communityId.date))}
                setLoading(false)
                isCancelled = true
            } catch (error) {
                setError(error.message)
                setLoading(false)
        }
    }, [])
    
    async function handleSubmit(){
        
        
        await api.post('/comment/register', { token, id, comment })
        .catch((error) =>{ 
            alert(error.response.data)
        })
        
    }

    async function handleDelete(){

       const response = await api.post(`/post/deletePost`, {id, token}).catch((error) =>{ setError(error.message)})
        navigate(`/community/${response.data.id}/1`)
    }

    

    return(

        <Container>

            {
                !loading ?
                <PostBox>
                { !error ?
                    <div>
                        <div style={{display: 'flex',
                        justifyContent: 'space-between'
                        }} >
                            <h1>{ data.title}</h1>
                            {data.authorId.user == getUser() ? <button onClick={handleDelete} style={{width: '80px',}} ><FiTrash/></button> : <span></span>}
                        </div>
                        <div className='postBody' > {data.url ? <img src={data.url} /> : <span>{data.body}</span> } </div>
                        <div className='footer'><StyledLink to={`/community/${data.communityId._id}/1`}> {data.communityId.name} </StyledLink> {<StyledLink  to={`/profile/${data.authorId.user}`} > {data.authorId.user} </StyledLink> }</div>
                    </div> :
                    <AlertBox><span>{error}</span></AlertBox>
                }
                </PostBox> 
                : <h1>Loading...</h1>
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
                <Comments id={id}/> 
            </CommentsBox>
            <div className='aside'>
                {
                    !error ?? <InfoBox community={data.communityId}/>
                }
            </div>
        </Container> 

    )
}