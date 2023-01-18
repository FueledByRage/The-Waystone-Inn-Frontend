import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router";
import Modal from "../../components/modal";
import UploadAvatar from '../../components/UploadAvatar'
import api from "../../services/api";
import { getUser } from "../../storage/utils";
import { getToken } from "../../storage/utils";
import './style.css'

export function EditProfile({ profileURL }){

    const [ file, setFile ] = useState();
    const navigate = useNavigate();
    const { user } = useParams();
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await api.get(`/user/${user}`);
                setData(response.data)
                
            } catch (error) {
                setError('Error reaching user data');
            }
        }
        //fetchData();
    },[]);

    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        await api.put('/user/edit', formData).catch((error)=>{
            setError(error)
        });
    }

    function handleFile(files){ 
        setFile(files[0]) 
    }

    if(!getToken()) return <Navigate to="/login" replace/>
    

    return(
        <div className="container">
            <form onSubmit={handleSubmit}>
                { <UploadAvatar src={profileURL} handleFile={handleFile} /> }
                
                <button className="button" >Edit</button>
            </form>
        </div>
    )


}