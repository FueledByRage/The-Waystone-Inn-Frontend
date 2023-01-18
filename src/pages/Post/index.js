import React, { useEffect, useState }from 'react';
import { useNavigate } from 'react-router';
import  InfoBox  from '../../components/infoBox';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { getUser } from '../../storage/utils';
import Comments from '../../components/Comments';
import  { PostBody, PostBox, PostFooter, PostTitle, LikeBox }  from '../../components/PostComponents';
import { CommentsBox, ContainerPost, StyledLink, StyledFormComment, Aside } from './components';
import { AlertBox } from '../../components/Alert';
import { FiThumbsUp, FiThumbsDown, FiTrash } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import Loading from '../../components/Loading';




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
                let isCancelled = false;
                const response = await api.get(`/post/${id}`).catch((error)=> {
                    throw Error(error.response.data);
                });
                if(!isCancelled){     
                    setData(response.data);
                    setLikes({like: response.data.like, dislike: response.data.dislike, likes: response.data.likes})
                }
                    setLoading(false);
                    isCancelled = true;
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            await api.post('/comment/register', { id, comment });
            document.location.reload(); 
            
        } catch (error) {

            const { data : message  } = error.response;

            message ? setErrorSubmit(message) : setErrorSubmit('Error submiting comment');
        }
    }

    async function handleDelete(){
       const response = await api.delete(`/post/${id}`).catch((error) =>{ setError(error.message)});
         navigate(`/community/${response.data.id}/1`);
    }


    if(loading) return ( <div className='loading-container' >
        <Loading />
    </div> )

    async function handleLike(e){
        await api.get(`/like/${id}`).catch(e =>{
            return
        })
        setLikes({like: true, dislike: false, likes: ++data.likes})

    }
    async function handleDislike(e){
        await api.get(`/dislike/${id}`).catch(e =>{
            return
        })
        setLikes({like: false, dislike: true, likes: --data.likes})
    }

    return(

        <ContainerPost>
            {   
                error ? <AlertBox><span>{error}</span></AlertBox>  : 
                    <PostBox className='postBox' >
                        <LikeBox> 
                            <button onClick={ handleLike }>
                                <IconContext.Provider
                                    value={{color: likesState.like ? 'red' : 'none'
                                }}>
                                    <FiThumbsUp />
                                </IconContext.Provider>
                            </button>

                            <span>{likesState.likes}</span>

                            <div></div>    
                            {/*<button onClick={handleDislike}>                                
                                <IconContext.Provider value={{color: likesState.dislike ? 'red' : 'none'}}>
                                    <FiThumbsDown />
                                </IconContext.Provider>
                            </button>*/}
                        </LikeBox>

                        <PostTitle>
                            <h1>{ data.title}</h1>
                            {data.authorId.user == getUser() ? <button className='button' onClick={handleDelete} style={{width: '80px'}} ><FiTrash/></button> : <span></span>}
                        </PostTitle>

                        <PostBody > 
                            {data.url ? <img src={data.url} /> : <span>{data.body}</span> }
                        </PostBody>

                        <PostFooter>
                            <StyledLink to={`/community/${data.communityId._id}/1`}> 
                                {data.communityId.name} 
                            </StyledLink> 
                            <StyledLink  to={`/profile/${data.authorId.user}`} > 
                                {data.authorId.user} 
                            </StyledLink> 
                        </PostFooter>
                    </PostBox>
            }
            <CommentsBox>
                <StyledFormComment onSubmit={handleSubmit}>
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
                </StyledFormComment>

                {errorSubmit && <AlertBox><span>{errorSubmit}</span></AlertBox>}

                <Comments id={id}/> 
            </CommentsBox>
            <Aside>
                {
                    !error && <InfoBox communityId={ data.communityId }/>
                }
            </Aside>
        </ContainerPost> 

    )
}