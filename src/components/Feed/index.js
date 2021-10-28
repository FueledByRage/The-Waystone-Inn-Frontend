import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import { getSubs } from '../../storage/utils'
import StyledLink from '../Link/Link'
import { Container, PostBox, PostsContainer, StyledFooter } from './style'

export default function Feed(props){

    const [ posts, setPosts ] = useState({})
    const [ error, setError ] = useState(null)
    const subs = Array.from(JSON.parse(getSubs()))
    const [ lastPage, setLastPage ] = useState(false)
    const { pageCount } = props
    const [ page, setPage ] = useState(parseInt(pageCount))
    const [ loading, setLoading ] = useState(true)

    useEffect( async ()=>{
        try {
            let isCancelled = false
    
                const response = await api.post(`/posts/`, { subs, page }).catch((error)=>{
                    throw Error(error.response.data)
                })
                if(!isCancelled) {
                    setLastPage(response.data['lastPage'])
                    setPosts(response.data['docs'])
                }

                return () => {
                    setLoading(false)
                    isCancelled = true
                }
        } catch (error) {
            setError(error.message)
        }

    },[])

    async function handlePosts(nextMod){
    const response = await api.post(`/posts/`, { subs, page, nextMod }).catch((error)=>setError(error.message))
    setPosts(response.data['docs'])
    setPage(response.data['page'])
    setLastPage(response.data['lastPage'])
}



    return(
        loading ?
        <Container>
            {
                error ? <h1>{error}</h1> : Array.from(posts).map((post) => 
                        <PostBox>
                            <StyledLink  to={`/post/${post._id}`} >{post.title}</StyledLink>
                            
                            <div className='postBody' >
                                {
                                    post.url ? <img src={post.url} /> :
                                    <p>
                                        { post.body }
                                    </p>
                                }
                            </div>

                            <div className='footer' ><StyledLink to={`/community/${post.communityId._id}/1`}> {post.communityId.name} </StyledLink> <StyledLink  to={`/post/${post._id}`} >{post.authorId.user}</StyledLink> </div>
                        </PostBox>
                )
            }
            <StyledFooter><button disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='next' disabled = { lastPage == page } onClick={() => handlePosts(1)} >Next</button> </StyledFooter>
        </Container> : <h1> 'Loading...' </h1>

    )
}