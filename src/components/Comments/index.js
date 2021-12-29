import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { FiUser } from 'react-icons/fi'
import { getToken, getUser } from '../../storage/utils'
import { FiTrash } from 'react-icons/fi'
import StyledLink from '../Link/Link'
import './Comments.css'


export default function Comments(props){
    const [ error, setError ] = useState(null) 
    const [ data, setData ] = useState(null)
    const [loading, setLoading ] = useState(false)

    useEffect(async () =>{

        try {
            let isCancelled = false
            const response = await api.get(`/comments/${props.id}`).catch((error) => { 
                throw Error(error.response.data) })
            if(!isCancelled) setData(response.data) 
            return () => {
                isCancelled = true
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }


    }, [])

    async function handleDelete(id){
            console.log(id)
            await api.post(`/comment/deleteComment`,{ id, token: getToken() }).catch((error) =>{
                setError(error.message)
            })
            window.location.reload()
            
    }

    return(
        !data || loading || error ? <h1> { error || 'Loading...'  } </h1> :
        <div>
                    {
                        Array.from(data).map(
                            c => (
                                <div key={c._id} className = 'comment'>
                                    <div className = 'commentHeader'>
                                        <div>
                                            <FiUser />
                                            <StyledLink to={`/profile/${c.authorId.user}`}> <span>{c.authorId.user}</span> </StyledLink> 
                                        </div>
                                        {c.authorId.user == getUser() ? <button onClick={() => { handleDelete(c._id) }} className='trashButton'> <FiTrash /> </button> : <span>{data.authorId.user}</span>}
                                        </div>
                                    <p>{c.comment}</p>
                                </div>
                             )
                        )
                    }
        </div>
    )

}