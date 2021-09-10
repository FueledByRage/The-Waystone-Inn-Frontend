import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import { FiCalendar } from 'react-icons/fi'
import './Profile.css'


export default function ProfilePage(props){
    
    const { user } = useParams()
    const [ error, setError ] = useState(null)
    const [ data, setData ] = useState(null)

    useEffect(async ()=>{
        const response = await api.get(`/user/get/${user}`).catch((error)=>{ setError(error) })
        console.log(response)
        setData(response.data)
    },[])

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }


    return(
        <div>
            {
                error || !data ? <h1>{error}</h1> : 
                <div className = 'profile'>
                    <h1>{data.user}</h1>
                    <h3>{data.name}</h3>
                    <div className = 'created'><span><FiCalendar /> Joined: {getDate(data.date)}</span></div>
                </div>
            }
        </div>
    )

}