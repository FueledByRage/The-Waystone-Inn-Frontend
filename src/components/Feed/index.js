import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import { getSubs } from '../../storage/utils'
import { AlertBox } from '../Alert'
import StyledLink from '../Link/Link'
import { Container, PostBox, PostFooter, PostsContainer, PostText, StyledFooter } from './style'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { LikeBox } from '../likeBox'

export default function Feed(props){

    const [ posts, setPosts ] = useState({})
    const [ error, setError ] = useState(null)
    //const subs = Array.from(JSON.parse(getSubs()))
    const [ lastPage, setLastPage ] = useState(false)
    const { pageCount } = props
    const [ page, setPage ] = useState(parseInt(pageCount))
    const [ loading, setLoading ] = useState(true)

    useEffect( async ()=>{
        try {    
            const response = await api.post(`/posts/`, { page }).catch((error)=>{
                throw Error(error.response.data)
            })
            setLastPage(response.data['lastPage'])
            setPosts(response.data['docs'])
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }

    },[])

    async function handlePosts(nextMod){
        const response = await api.post(`/posts/`, { page, nextMod }).catch((error)=>setError(error.message))
        setPosts(response.data['docs'])
        setPage(response.data['page'])
        setLastPage(response.data['lastPage'])
}



    return(
        !loading ?
        <Container>
            {
                error ?<AlertBox><span>{error}</span></AlertBox> : Array.from(posts).map((post) => 
                        <PostBox>
                            <LikeBox> <FiThumbsUp /> <span>{PostFooter.likes || 0}</span> <FiThumbsDown /></LikeBox>
                            <div className='postBody'>                          
                                <StyledLink  to={`/post/${post._id}`} >{post.title}</StyledLink>
                                    {
                                        post.url ? <img src={post.url} /> :
                                        <p>
                                            { post.body }
                                        </p>
                                    }
                            </div>
                            <div className='footer'>
                                <StyledLink to={`/community/${post.communityId._id}/1`}> {post.communityId.name} </StyledLink> <StyledLink  to={`/profile/${post.authorId.user}`} >{post.authorId.user}</StyledLink> 
                            </div>
                            
                        </PostBox>
                )
            }
            <StyledFooter><button className='button' disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='button' disabled = { lastPage == page } onClick={() => handlePosts(1)} >Next</button> </StyledFooter>
        </Container> : <h1> 'Loading...' </h1>

    )
}