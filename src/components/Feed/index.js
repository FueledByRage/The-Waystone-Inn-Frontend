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
    let  isLastPage = false
    const { pageCount } = props
    const [ page, setPage ] = useState(parseInt(pageCount))

    useEffect( async ()=>{

        let isCancelled = false

            const response = await api.post(`/posts/`, { subs, page }).catch((error)=>setError(error.response.data.message))
            if(!isCancelled) setPosts(response.data['docs'])
            return () => {
                isCancelled = true
            }
    },[])

    async function handlePosts(nextMod){

    const response = await api.post(`/posts/`, { subs, page, nextMod }).catch((error)=>setError(error.message))
    console.log(response)
    setPosts(response.data['docs'])
    setPage(response.data['page'])
    isLastPage = response.data['lastPage']
}



    return(
        
        <Container>
            {
                error ? <h1>{error.message}</h1> : Array.from(posts).map((post) => 
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

                            <div className='footer' > <StyledLink  to={`/post/${post._id}`} >{post.authorId.user}</StyledLink> </div>
                        </PostBox>
                )
            }
            <StyledFooter><button disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='next' disabled = { isLastPage } onClick={() => handlePosts(1)} >Next</button> </StyledFooter>
        </Container>

    )
}