import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import { getSubs } from '../../storage/utils'
import StyledLink from '../Link/Link'

import './Feed.css'

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
        <div className='feed-div'>
            {
            error ? <h1> {error} </h1> :        
            <ul>
                {
                Array.from(posts).map( post => (
                    <li key={post.id}>
                        <div className='title'><StyledLink to={`/post/${post._id}`}><h3>{post.title}</h3></StyledLink></div>
                        <p>{post.body}</p>
                        <div className='footer'> <StyledLink to = {`/profile/${post.authorId.user}`}> { post.authorId.user } </StyledLink></div>
                    </li>
                ))}
            </ul>}
            <footer className='buttons'><button disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='next' disabled = { isLastPage } onClick={() => handlePosts(1)} >Next</button> </footer>
        </div>
    )
}