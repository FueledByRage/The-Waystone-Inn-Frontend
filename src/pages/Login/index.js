import React, { useState } from "react"
import api from "../../services/api"
import { setUserSession } from "../../storage/utils"
import { Container, StyledForm, StyledInput, StyledLabel, StyledLabelPassword, StyledText } from "./style"
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/beerIcon.png'
import './Login.css'
import { StyledLink } from "../Post/style"



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
            setError(error.response.data || error.message)
            setLoading(false)
        }
    }
    return(
                <StyledForm>
                <img src={logo}/>

                <form onSubmit={handleSubmit}>


                <StyledInput
                    id="email"
                    type="text"
                    name="email"
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <StyledLabel for='email'> Email </StyledLabel>
                <StyledInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <StyledLabelPassword for='Senha'> Password </StyledLabelPassword>
                <button className="button" type="submit" disabled={loading}>Login</button>

                </form>
                <StyledText > <StyledLink to='/register' >Register</StyledLink> </StyledText>

                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                </StyledForm>

    )
}