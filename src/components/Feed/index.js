import React, { useEffect, useState } from 'react'
import 'react-jquery-plugin'
import api from '../../services/api'
import { AlertBox } from '../Alert'
import StyledLink from '../Link/Link'
import { Container, PostBox, StyledFooter } from './style'
import { About, PopUp, Title } from '../communityPopUp'

export default function Feed(props){

    const [ posts, setPosts ] = useState({})
    const [ error, setError ] = useState(null)
    const [ lastPage, setLastPage ] = useState(false)
    const { pageCount } = props
    const [ page, setPage ] = useState(parseInt(pageCount))
    const [ loading, setLoading ] = useState(true)
    

    useEffect(()=>{
        async function fetchData(){
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
        }
        fetchData()
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
                                <StyledLink to={`/community/${post.communityId._id}/1`}> {post.communityId.name}
                                    <PopUp>
                                        <Title>{post.communityId.name}</Title>
                                        <About>{post.communityId.description}</About>
                                    </PopUp>
                                </StyledLink> 
                                <StyledLink  to={`/profile/${post.authorId.user}`} >{post.authorId.user}</StyledLink> 
                            </div>
                            
                        </PostBox>
                )
            }
            {!error && <StyledFooter><button className='button' disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='button' disabled = { lastPage == page } onClick={() => handlePosts(1)} >Next</button> </StyledFooter>}
        </Container> : <h1> 'Loading...' </h1>

    )
}