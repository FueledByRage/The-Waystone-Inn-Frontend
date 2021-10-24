import React, { useState } from "react"
import api from "../../services/api"
import { setUserSession } from "../../storage/utils"
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'



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
            
            const response = await api.post('/user/register', {name, user, email, password})

            const { username, token, subs } = response.data
    
            setLoading(false)
            setUserSession(token, username, subs)  
            navigate('/')
        } catch (error) {
            setError(error.response.data)
        }


    }

    
    return(
        <div className='register-div'>
        <form onSubmit={handleSubmit}>
            <input 
            id='name'
            name='name'
            type='text'
            placeholder='Name'
            onChange = { e => setName(e.target.value)}
            value = {name}
            />
            <label className='name' > Name </label>
            <input 
            id='user'
            name='user'
            type='text'
            placeholder='User'
            value={user}
            onChange = { e => setUser(e.target.value) }
            />
            <label className='user'> User </label>
            <input 
            id='email'
            name='email'
            type='text'
            placeholder='Email'
            value = {email}
            onChange = { e => setEmail(e.target.value) }            
            />
            <label className='email'> Email </label>
            <input 
            id='password'
            name='password'
            type='text'
            placeholder='Password'
            value = {password}  
            onChange = { e => setPassword(e.target.value) }          
            />
            <label className='password'> Password </label>
            <input 
            id='confirmPassword'
            name='confirmPassword'
            type='text'
            placeholder='Confirm Password'     
            value = {confirmPassword}
            onChange = { e => setConfirmPassword(e.target.value) }       
            />
            <label className='confirmPassword' > Confirm Password </label>

            <button className='button' type="submit" disabled={loading}>Cadastrar</button>

            
        </form>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        </div>

    )



}