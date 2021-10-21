import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { getToken, getUser } from '../../storage/utils'
import { FiTrash } from 'react-icons/fi'
import StyledLink from '../Link/Link'
import './Comments.css'


export default function Comments(props){
    const [ error, setError ] = useState(null) 
    const [ data, setData ] =useState(null)
    const navigate = useNavigate()

    useEffect(async () =>{
        let isCancelled = false
        const response = await api.get(`/comments/${props.id}`).catch((error) => setError(error.message))
        if(!isCancelled) setData(response.data) 
        return () => {
            isCancelled = true
        }

    }, [])

    async function handleDelete(id){

            await api.post(`/comment/deleteComment`,{ id, token: getToken() }).catch((error) =>{
                setError(error.message)
            })
            window.location.reload()
            
    }

    return(
        !data ? <h1> { error } </h1> :
        <ul>
                    {
                        Array.from(data).map(
                            c => (
                                <div key={c._id} className = 'comment'>
                                    <div className = 'commentHeader'>
                                        <div>
                                            <FiUser />
                                            <StyledLink to={`/profile/${c.authorId.user}`}> <span>{c.authorId.user}</span> </StyledLink> 
                                        </div>
                                        {c.authorId.user == getUser() ? <button className='delete' onClick={() => { handleDelete(c._id) }} className='trashButton'> <FiTrash /> </button> : <span>{data.authorId.user}</span>}
                                        </div>
                                    <p>{c.comment}</p>
                                </div>
                             )
                        )
                    }
        </ul>
    )

}