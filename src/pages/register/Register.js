import React, { useState } from "react"
import api from "../../services/api"
import { setUserSession } from "../../storage/utils"
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { RegisterContainer, RegisterInput, RegisterLabel, StyledForm } from "../../components/Register"



export default function Register(){

    const [ error, setError ] = useState(null)
    const [ loading, setLoading] = useState(false)
    const [ name, setName ] = useState('')
    const [ user, setUser ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const navigate = useNavigate()


    
    async function handleSubmit(e){
        e.preventDefault()

        if(password != confirmPassword) return setError('The passwords must be the same')

        try {
            if(email == '' || user == '' || email == '' || password == '' || confirmPassword == '') return setError('Missing data!')
            
            const response = await api.post('/user/register', { name, user, email, password })

            const { username, token, subs } = response.data
    
            setLoading(false)
            setUserSession(token, username, subs)  
            navigate('/')
        } catch (error) {
            setError(error.response.data)
        }


    }

    
    return(
        <>
            <RegisterContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <RegisterInput
                        placeholder={'Name'}
                        type={'text'}
                        onChange={e=> setName(e.target.value) }
                    />
                    <RegisterLabel
                        id={'name'}
                    >Name</RegisterLabel>
                    <RegisterInput
                        placeholder={'Email'}
                        type={'text'}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <RegisterLabel
                        id={'email'}
                    >E-mail</RegisterLabel>
                    <RegisterInput
                        placeholder={'Username'}
                        type={'text'}
                        onChange={e => setUser(e.target.value)}
                    />
                    <RegisterLabel
                        id={'user'}
                    >Username</RegisterLabel>

                    <RegisterInput
                        placeholder={'Password'}
                        type={'text'}
                        onChange={e => setPassword(e.target.value)}

                    />
                    <RegisterLabel
                        id={'password'}
                    >Password</RegisterLabel>

                    <RegisterInput
                        placeholder={'Confirm Password'}
                        type={'text'}
                        onChange={e => setConfirmPassword(e.target.value)}

                    />
                    <RegisterLabel
                        id={'confirmPassword'}
                    >Confirm Password</RegisterLabel>
                    <button className="button" type="submit" disabled={loading} >
                        Registrar
                    </button>
                </StyledForm>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
            </RegisterContainer>
        </>
    )
}