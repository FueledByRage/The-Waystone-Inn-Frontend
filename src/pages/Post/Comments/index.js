import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { FiUser } from 'react-icons/fi';
import { getToken, getUser } from '../../../storage/utils';
import { FiTrash } from 'react-icons/fi';
import StyledLink from '../../../components/Link/Link';
import { Comment, CommentAvatar, CommentHeader, UserData } from './components';


export default function Comments(props){
    const [ error, setError ] = useState(null) 
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() =>{
        async function fetchData(){
            try {
                let isCancelled = false;
                const response = await api.get(`/comments/${props.id}`).catch((error) => { 
                    throw Error(error.response.data) });
                console.log(response.data);
                if(!isCancelled) setData(response.data);
                return () => {
                    isCancelled = true;
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        }
        fetchData()
    }, [])

    async function handleDelete(id){
            await api.delete(`/comment/${id}`,{ id, token: getToken() }).catch((error) =>{
                setError(error.message)
            })
            window.location.reload()
            
    }

    return(
        !data || loading || error ? <h1> { error || 'Loading...'  } </h1> :
        <div>
                    {
                        Array.from(data).map(
                            comment => (
                                <Comment key={comment._id}>
                                    <CommentHeader>
                                        <UserData>
                                            { comment.authorId.profileURL ? 
                                            <CommentAvatar src={comment.authorId.profileURL} /> : 
                                            <FiUser />
                                            }
                                            <StyledLink to={`/profile/${comment.authorId.user}`}> 
                                                <span>{comment.authorId.user}</span> 
                                            </StyledLink> 
                                        </UserData>
                                        {
                                        comment.authorId.user === getUser() ? 
                                        <button onClick={() => { handleDelete(comment._id) }} className='button'> 
                                            <FiTrash /> 
                                        </button> : <span>{data.authorId.user}</span>
                                        }
                                    </CommentHeader>
                                    <p>{comment.comment}</p>
                                </Comment>
                             )
                        )
                    }
        </div>
    )

}