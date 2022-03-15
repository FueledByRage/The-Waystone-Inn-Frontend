import React, { useState,  } from "react";
import { useNavigate } from "react-router";
import api from "../../../services/api";
import './community.css';


export default function RegisterCommunity(){


    const [loading, setLoading] = useState(false)
    const [ error, setError ] = useState(null)
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const navigate = useNavigate()
    
    async function handleSubmit(e){
        
        e.preventDefault()

        try {
            setLoading(true)

            const response = await api.post('/register/community', { name, description })
            navigate(`/community/${response.data.id}`)


        } catch (error) {
            setError(error.response.data)
        }

    }

    return(
        <div className="container">
        <form onSubmit={handleSubmit}>
            <textarea 
            id='name'
            name='name'
            type='text'
            placeholder='Community name'
            value={name}
            onChange={ e => setName(e.target.value)}
            />
            <textarea 
            id='description'
            name='description'
            type='text'
            rows="5"
            placeholder='Community description'
            value={description}
            onChange={ e => setDescription(e.target.value) }
            />
            <button className="button" type="submit" disabled={loading}>Create</button>
        </form>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        </div>

    )

}