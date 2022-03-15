import api from "../../services/api";
import React, { useState } from "react";
import logo from '../../assets/beerIcon.png';
import { StyledLink } from "../Post/components";
import { StyledFormLogin, StyledInputLogin } from "./components";
import { setUserSession } from "../../storage/utils";
import { useNavigate } from 'react-router-dom';
import './Login.css';


export default function Login(){
    const navigate = useNavigate();

    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    async function handleSubmit(event){
        event.preventDefault()

        if(email === '' || password === '') return setError('Missing credentials!')

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
        <div className="container" >
            <StyledFormLogin  onSubmit={handleSubmit}>
                <img src={logo}/>
                <StyledInputLogin 
                    id="email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required ='required'
                />
                <label id="label-email">Email</label>
                <StyledInputLogin 
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required ='required'
                />
                <label id="label-password">Password</label>
                <button className="button" type="submit">Login</button>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                <StyledLink to='/register' >Register</StyledLink>
                <div></div>
            </StyledFormLogin>

        </div>
    );
}