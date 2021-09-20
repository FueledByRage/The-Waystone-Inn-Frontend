import React, { useEffect, useState } from 'react'
import  Feed  from '../../components/Feed'
import { FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { getToken } from '../../storage/utils'
import StyledLink from '../../components/Link/Link'

import './Home.css'

export default function HomePage(){

    const [ data, setData ] = useState([])

    useEffect(async ()=>{
        const token = getToken()
        const communities = await api.post(`/communities`, { token })
        const communitiesArray = Array.from(communities.data) 
        
        if(communitiesArray.length >= 4 )setData(communitiesArray.slice(0, 3))
        else setData(communitiesArray)
        

    },[])


    return (
        <div className='home-div'>
            <section>
            <h1> Home page here!</h1>
            <Feed pageCount={1}/>
            </section>
            <aside>
                <ul className='communities'>
                <h3>Communities:</h3>   
                {
                data.map(community => (
                    <div className='community'> <div className='icon'><FiArrowRight /></div> <StyledLink to={`/community/${community._id}/1`}><h3> {community.name}</h3> </StyledLink>  </div>
                ))}
                </ul>
            </aside>
        </div>
    )
}
