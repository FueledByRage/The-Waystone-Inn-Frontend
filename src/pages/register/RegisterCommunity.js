import React, { useState,  } from "react"
import { useNavigate } from "react-router"
import api from "../../services/api"
import { getToken } from "../../storage/utils"


export default function RegisterCommunity(){


    const token = getToken()
    const [loading, setLoading] = useState(false)
    const [ error, setError ] = useState(null)
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const navigate = useNavigate()
    
    async function handleSubmit(e){
        
        e.preventDefault()

        try {
            setLoading(true)

            const response = await api.post('/register/community', { token, name, description })

            //Gotta redirect to the just created community

            navigate(`/community/${response.data.id}`)


        } catch (error) {
            setError(error.response.data.message)
        }

    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input 
            id='name'
            name='name'
            type='text'
            placeholder='Community name'
            value={name}
            onChange={ e => setName(e.target.value)}
            />
            <input 
            id='description'
            name='description'
            type='text'
            placeholder='Community description'
            value={description}
            onChange={ e => setDescription(e.target.value) }
            />
            <button type="submit" disabled={loading}>Create</button>
        </form>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        </div>

    )

}