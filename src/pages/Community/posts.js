import React, { useEffect, useState } from 'react'
import { ErrorBox, FooterButtons } from './components';
import  { PostBody, PostBox, PostFooter }  from '../../components/PostComponents';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { LikeBox } from '../../components/PostComponents';
import StyledLink from '../../components/Link/Link';
import { useParams } from 'react-router-dom';
import { PostsContainer } from './components';
import { AlertBox } from '../../components/Alert';
import api from '../../services/api';


export default function Posts( props ) {

    const [ data, setData ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState();
    const [ page, setPage ] = useState(1);
    const { id } = useParams()


    useEffect(()=>{
        const fetchData = async () =>{
            try {                
                const response = await api.get(`/posts/${id}/${page}/${props.register}`);
                if(response.data) {
                    setData(response.data);
                    setLoading(false);
                    return
                }
                throw new Error('Error reaching posts');
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
    },[page]);

    function getDate(date){
        const newDate = new Date(date);

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    return (
        <PostsContainer>

        {
            loading ? <h1>Loading...</h1> :
            error != null ? <ErrorBox><AlertBox> {error} </AlertBox></ErrorBox> : data.posts.map((post)=>(
                <>
                    <PostBox>
                        <LikeBox> <FiThumbsUp /> <span>{post.likes || 0}</span> <FiThumbsDown /></LikeBox>

                        <StyledLink to={`/post/${post._id}`}><span>{post.title}</span></StyledLink>
                        <PostBody className='postBody' >
                            { !post.url ? <p>{post.body}</p> : <img className='postImg' src={post.url}/>}
                        </PostBody>
                        <PostFooter className='footer'>
                            <StyledLink to={`/profile/${post.authorId.user}`} > {post.authorId.user } </StyledLink >
                            <span>  {getDate(post.date)}</span>
                        </PostFooter>
                    </PostBox>
                </>
            )
        )
        }
        <FooterButtons>            
            <button className='button' disabled = { page == 1 } onClick={() => setPage(parseInt(page) - 1)} >Previous</button> 
            <button className='button' disabled = { data?.lastPage } onClick={() => setPage(parseInt(page) + 1)} >Next</button>     
        </FooterButtons>
    </PostsContainer>
    )
}
