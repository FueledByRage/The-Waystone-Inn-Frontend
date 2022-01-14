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
import { IconContext } from 'react-icons'




export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()
    const [ comment, setComment ] = useState('')
    const navigate = useNavigate()
    const [ likesState, setLikes ] = useState({like: false, dislike: false, likes: 0})
    
    
    useEffect(()=>{
        
        async function fetchData(){
            try {
                const user = getUser()
                let isCancelled = false
                const response = await api.get(`/post/${id}/${user || 'nl'}`).catch((error)=> {
                    throw Error(error.response.data)
                })
                                  
                if(!isCancelled){     
                    setData(response.data)
                    setLikes({like: response.data.like, dislike: response.data.dislike, likes: response.data.post.likes})
                }
                    setLoading(false)
                    isCancelled = true
                } catch (error) {
                    setError(error.message)
                    setLoading(false)
            }
        }
        fetchData()
        
    }, [])
    
    async function handleSubmit(){
        await api.post('/comment/register', { id, comment })
        .catch((error) =>{ 
            setErrorSubmit(error.response.data)
        })
        
    }

    async function handleDelete(){
       const response = await api.post(`/post/deletePost`, { id }).catch((error) =>{ setError(error.message)})
        navigate(`/community/${response.data.id}/1`)
    }

    if(loading) return ( <h1>Loading...</h1> )

    async function handleLike(e){
        await api.get(`/like/${id}`).catch(e =>{
            return
        })
        setLikes({like: true, dislike: false, likes: ++data.post.likes})

    }
    async function handleDislike(e){
        await api.get(`/dislike/${id}`).catch(e =>{
            return
        })
        setLikes({like: false, dislike: true, likes: --data.post.likes})
    }

    return(

        <Container>
            {   
                error ? <AlertBox><span>{error}</span></AlertBox>  : 
                    <PostBox>
                        <LikeBox> 
                            <button onClick={ handleLike }>
                                <IconContext.Provider
                                    value={{color: likesState.like ? 'red' : 'none'
                                }}>
                                    <FiThumbsUp />
                                </IconContext.Provider>
                            </button>
                            <span>{likesState.likes}</span> 
                            <button onClick={handleDislike}>                                
                                <IconContext.Provider value={{color: likesState.dislike ? 'red' : 'none'}}>
                                    <FiThumbsDown />
                                </IconContext.Provider>
                            </button>
                        </LikeBox>
                        <div className='title'>
                            <h1>{ data.post.title}</h1>
                            {data.post.authorId.user == getUser() ? <button className='button' onClick={handleDelete} style={{width: '80px',}} ><FiTrash/></button> : <span></span>}
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