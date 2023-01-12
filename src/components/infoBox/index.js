import React, { useEffect, useState } from 'react'
import { FiCalendar } from 'react-icons/fi'
import api from '../../services/api';
import Loading from '../Loading';
import './infoBox.css'



export default function InfoBox(props){

    const [ communityData, setCommunityData ] = useState();
    const [ loading, setLoading ] = useState(true); 

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await api.get(`/community/read/${props.communityId}`);
                if(response.data) {
                    setCommunityData(response.data.community);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData();
    },[]);

    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }
    return(
        <div className='communityInfo'>
            {
                loading ? <h1>
                    <Loading />
                </h1> :
            <>
                <h2>{communityData.name}</h2>
                <p>{communityData.description}</p>
                <div className='date'>
                    <FiCalendar/>
                    <span>Created: </span>
                    <span>{ getDate(communityData.date)}</span>
                </div>
            
            </>}
        </div>
    )


}