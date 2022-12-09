import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Dashboard, DashboardContainer, DashboardItem } from "./components";
import api from "../../services/api";
import { getToken } from "../../storage/utils";


export default function CommunityDashboard(){
    const [ data, setData ] = useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await api.get(`/communities`).catch( e => setError(e.data))

            setData(response.data);
        }
    },[]);

    if(!getToken()) return <Navigate to="/login" replace/>


    return(
        <DashboardContainer>
            <Dashboard>
                <DashboardItem>
                    <span>Community name</span>
                    <span>00/00/0000</span>
                    <div>
                        X
                        +
                    </div>
                </DashboardItem>
            </Dashboard>
        </DashboardContainer>
    );
}