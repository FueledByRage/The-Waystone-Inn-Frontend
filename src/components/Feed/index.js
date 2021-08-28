import React, { useEffect, useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import api from '../../services/api'
import privateRoute from '../../services/private'
import { getToken, isLogged, getSubs } from '../../storage/utils'
import './Feed.css'


export default function Feed(){

    const [ posts, setPosts ] = useState({})
    const [ error, setError ] = useState(null)

    const subs = getSubs()

    useEffect( async ()=>{

        let isCancelled = false

        const subs = Array.from(JSON.parse(getSubs()))
        api.post('/posts', { subs }).then((response) => {
            console.log(response.data)
            if(!isCancelled) setPosts(response.data)}
            ).catch((error)=>setError(error.response.data.message))
            return () => {
                isCancelled = true
            }
    },[])


    return(
        <div className='feed-div'>
            {
            error ? <h1> {error} </h1> :        
            <ul>
                {
                Array.from(posts).map( post => (
                    <li key={post.id}>
                        <div className='title'><Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link></div>
                        <p>{post.body}</p>
                        <div className='footer'> { post.authorId.user } </div>
                    </li>
                ))}
            </ul>}
        </div>
    )
}