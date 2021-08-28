import React, { useState } from "react"
import api from "../../services/api"
import { getToken, setUserSession } from "../../storage/utils"
import { Link, useNavigate } from 'react-router-dom'
import ErrorPage from "../ErrorPage"


export default function Post(props){

    const  [error, setError] = useState(null)
    const  [ title, setTitle ] = useState('')
    const  [ body, setBody ] = useState('')
    const navigate = useNavigate()


    return(
        <div>
        <form onSubmit={props.submit}>
            <input 
            type='text'
            value={title}
            placeholder='Title'
            onChange = {e => setTitle(e.target.value)}
            />
            <input 
            type='text'
            value={body}
            placeholder='Body'
            onChange = { e => setBody(e.target.value) }
            />
            <button>Post</button>
        </form>
        </div>
    )


}