import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import { FiCalendar } from 'react-icons/fi'
import { StyledAvatar } from "../../components/UploadAvatar/StyledAvatar";
import StyledLink from '../../components/Link/Link'
import './Profile.css'



export default function ProfilePage(props){
    
    const { user } = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(async ()=>{

        try {
            const response = await api.get(`/user/get/${user}`)
            setData(response.data)
        } catch (error) {
            setError('Error reaching data!')   
        }
    }, [])

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }


    return(
        loading ? <h1>Loading...</h1> :
        <div>
            {
                error || !data ? <h1>{error}</h1> : 
                <div className = 'profile'>
                    <StyledAvatar src={data.profileURL}/> 
                    <StyledLink to={`/${data.user}/edit`}><p>Editar</p></StyledLink>
                    <h1>{data.user}</h1>
                    <h3>{data.name}</h3>
                    <div className = 'created'><span><FiCalendar /> Joined: {getDate(data.date)}</span></div>
                </div>
            }
        </div>
    )

}