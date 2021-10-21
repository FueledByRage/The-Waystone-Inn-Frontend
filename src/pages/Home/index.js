import React, { useState, useEffect } from "react";
import  Feed  from '../../components/Feed'
import { FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { getToken } from '../../storage/utils'
import { Aside, BoxCommunities, Container, Header, Main, StyledLink } from "./style";



export default function HomePage(props){

    const [ data, setData ] = useState([])

    useEffect(async ()=>{
        const token = getToken()
        const communities = await api.post(`/communities`, { token })
        const communitiesArray = Array.from(communities.data) 
        
        if(communitiesArray.length >= 4 )setData(communitiesArray.slice(0, 3))
        else setData(communitiesArray)
        

    },[])

    return(
        <Container>
            <Header>
                <h1>The Waystone Inn</h1>
            </Header>
            <Main>
                <Feed pageCount={1} />
            </Main>
            <Aside>
                <BoxCommunities>
                    <h3>Communities:</h3>

                        {
                            data.map(community => (
                            <div> <div className='icon'><FiArrowRight /></div> <StyledLink to={`/community/${community._id}/1`}><h3> {community.name}</h3> </StyledLink>  </div>
                            ))
                        }
  
                </BoxCommunities>
            </Aside>
        </Container>
    )


}