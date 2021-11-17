import React, { useState, useEffect } from "react";
import  Feed  from '../../components/Feed'
import { FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { getToken } from '../../storage/utils'
import { Aside, BoxCommunities, Container, Main, StyledLink } from "./style";



export default function HomePage(props){

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null)

    useEffect(async ()=>{
        try {
            const communities = await api.post(`/communities`, {}).catch((error)=>{
                throw Error(error.response.data)
            })
            const communitiesArray = Array.from(communities.data) 
            if(communitiesArray.length >= 4 )setData(communitiesArray.slice(0, 3))
            else setData(communitiesArray)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }

        

    },[])

    return(
        <Container>
            <Main>
                <Feed pageCount={1} />
            </Main>
            <Aside>

                {
                    !loading ?
                        <BoxCommunities>
                        
                            <h3>Communities:</h3>
                                {   !error ?
                                    data.map(community => (
                                    <div> <div className='icon'><FiArrowRight /></div> <StyledLink to={`/community/${community._id}/1`}><h3> {community.name}</h3> </StyledLink>  </div>
                                    )) : <h2>{error}</h2> 
                                }
    
                        </BoxCommunities> : 
                    <div>
                        <h1>Loading...</h1>
                    </div>
                }
            </Aside>
        </Container>
    )


}