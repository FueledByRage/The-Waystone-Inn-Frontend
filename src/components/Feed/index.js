import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/api'
import { getSubs } from '../../storage/utils'
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

            api.post(`/posts/`, { subs, page }).then((response) => {
                if(!isCancelled) setPosts(response.data['docs'])}
                ).catch((error)=>setError(error.response.data.message))
            return () => {
                isCancelled = true
            }
    },[])

    async function handlePosts(nextMod){

        api.post(`/posts/`, { subs, page, nextMod }).then((response) => {
            setPosts(response.data['docs'])
            setPage(response.data['page'])
            console.log(response.data['lastPage'])
            isLastPage = response.data['lastPage']
        }
        ).catch((error)=>setError(error.message))
    }



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
            <footer className='buttons'><button disabled = { page == 1 } onClick={() => handlePosts(-1)} >Previous</button> <button className='next' disabled = { isLastPage } onClick={() => handlePosts(1)} >Next</button> </footer>
        </div>
    )
}