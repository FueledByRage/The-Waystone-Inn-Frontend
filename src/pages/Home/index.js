import React, { useState, useEffect } from "react";
import  Feed  from './Feed'
import { FiArrowRight } from 'react-icons/fi'
import api from '../../services/api'
import { Navigate } from "react-router-dom";
import { Aside, BoxAside, BoxItem, Container, Main, StyledLink } from "./components";
import { getToken } from "../../storage/utils";
import SideMenu from "./SideMenu";



export default function HomePage(props){

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        
        async function fetchData(){
            try {
                const communities = await api.get(`/communities`).catch((error)=>{
                    throw Error(error.response.data);
                });
                const communitiesArray = Array.from(communities.data);
                setData(communitiesArray);
                setLoading(false);
            } catch (error) {
                setLoading(false)
                setError(error.message);
            }
        }
        if(getToken()) fetchData();
    },[])

    if(!getToken()) return <Navigate to="/login" replace/>

    return(
        <Container>
            <Main>
                <Feed pageCount={1} />
            </Main>
            <SideMenu />
        </Container>
    )


}