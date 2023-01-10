import api from "../../services/api";
import React, { useState } from "react";
import logo from '../../assets/beerIcon.png';
import { StyledLink } from "../Post/components";
import { ContainerLogin, StyledFormLogin, StyledInputLogin } from "./components";
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
        
        const response = await api.post('/user/login', {email, password})

        const { username, token } = response.data
        

        setUserSession(token, username)

        navigate('/')
        window.location.reload()
        }catch(error){
            setError(error.response.data || error.message)
            setLoading(false)
        }
    }


    return(
        <ContainerLogin>
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

                
                <StyledLink to='/register' >Register</StyledLink>
                <div></div>
            </StyledFormLogin>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}

        </ContainerLogin>
    );
}