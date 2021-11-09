import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import { FiCalendar } from 'react-icons/fi'
import { StyledAvatar } from "../../components/UploadAvatar/StyledAvatar";
import StyledLink from '../../components/Link/Link'
import './Profile.css'
import { AlertBox } from "../../components/Alert";



export default function ProfilePage(props){
    
    const { user } = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect( async ()=>{
        try {
            console.log("5")
            const response = await api.get(`/user/get/${user}`).catch((error) => {throw Error(error.response.data)})
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setError(error.message)   
            setLoading(false)
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
                error ? <center className='errorBox'> <AlertBox><span>{error}</span></AlertBox> </center>  : 
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