import React, { useState } from "react"
import api from "../../services/api"
import { isLogged, setUserSession } from "../../storage/utils"
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/beerIcon.png'
import './Login.css'



export default function Login(){
    const navigate = useNavigate()

    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null) 

    async function handleSubmit(event){
        event.preventDefault()

        if(email == '' || password == '') return setError('Missing credentials!')

        setLoading(true)

        try{
        
        const response = await api.post('/login', {email, password})

        const { user, token } = response.data


        setUserSession(token, user)

        navigate('/')
        window.location.reload()
        }catch(error){
            setError(error.response.data)
            setLoading(false)
        }
    }
    return(
            <div className='container'>

            <form onSubmit={handleSubmit}>

            <img src={logo}/>

            <input
                id="email"
                type="text"
                name="email"
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label for='email'> Email </label>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label className='password' for='Senha'> Senha </label>
            <button className="button" type="submit" disabled={loading}>Login</button>

            </form>
            <div className='text'> <Link to='/register' >Register</Link> </div>

            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            </div>
    )
}