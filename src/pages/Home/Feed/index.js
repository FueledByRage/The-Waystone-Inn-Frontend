import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { AlertBox } from '../../../components/Alert';
import StyledLink from '../../../components/Link/Link';
import { ContainerFeed, PostFeed, StyledFooter, PostFeedFooter, 
    PostFeedBody, PostFeedTitle } from './style';
import { About, PopUp, Title } from './CommunityPopUp';
import Loading from '../../../components/Loading';

export default function Feed(props){

    const [ posts, setPosts ] = useState({});
    const [ error, setError ] = useState(null);
    const [ lastPage, setLastPage ] = useState(false);
    const { pageCount } = props;
    const [ page, setPage ] = useState(parseInt(pageCount));
    const [ loading, setLoading ] = useState(true);
    

    useEffect(()=>{
        async function fetchData(){
            try {    
                const response = await api.get(`/feed/${page}/4`).catch((error)=>{
                    throw Error(error.response.data)
                })
                setLastPage(response.data['lastPage']);
                setPosts(response.data['posts']);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchData();
    },[]);

    async function handlePosts(next){
        try {
            const response = await api.get(`/feed/${page + next}/4`);
            
            setPosts(response.data['posts']);
            setPage(page + next);
            setLastPage(response.data['lastPage']);            
        } catch (error) {
            setError('Error reaching requested data');
        }
    }


    return(
        <ContainerFeed>
            { 
                !loading ? error ? <AlertBox><span>{ error }</span></AlertBox> : Array.from(posts).map((post) => 
                        <PostFeed>
                            <PostFeedTitle>
                                <StyledLink  to={`/post/${post._id}`} >{post.title}</StyledLink> 
                            </PostFeedTitle>

                            <PostFeedBody className='postBody'>                          
                                    {
                                        post.url ? <img src={post.url} /> :
                                        <p>
                                            { post.body }
                                        </p>
                                    }
                            </PostFeedBody>

                            <PostFeedFooter>
                                <StyledLink to={`/community/${post.communityId?._id}/1`}> {post.communityId?.name}
                                    <PopUp>
                                        <Title>{post.communityId?.name}</Title>
                                        <About>{post.communityId?.description}</About>
                                    </PopUp>
                                </StyledLink> 
                                <StyledLink  to={`/profile/${post.authorId?.user}`} >{post.authorId?.user}</StyledLink> 
                                
                            </PostFeedFooter>
                        </PostFeed>
                ) : <Loading />
            }
            
            <StyledFooter>
                <button className='button' disabled = { page == 1 || error || loading } onClick={() => handlePosts(-1)} >Previous</button> 
                <button className='button' disabled = { lastPage || error || loading } onClick={() => handlePosts(1)} >Next</button> 
            </StyledFooter>
        </ContainerFeed>

    )
}