import React from 'react'
import { FiCalendar } from 'react-icons/fi'
import './infoBox.css'



export default function InfoBox(props){


    function getDate(date){
        const newDate = new Date(date)

        return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`
    }

    return(
        <div className='communityInfo'>
            <h2>{props.community.name}</h2>
            <p>{props.community.description}</p>
            <div className='date'>
                <FiCalendar/>
                <span>Created: </span>
                <span>{ getDate(props.community.date)} /</span>
            </div>
        </div>
    )


}