import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import UploadAvatar from '../../components/UploadAvatar'
import api from "../../services/api";
import { getToken, getUser } from "../../storage/utils";


export function EditProfile(props){

    const [ file, setFile ] = useState()
    const navigate = useNavigate()
    const { user } = useParams()
    const [ data, setData ] = useState(null)
    const [ error, setError ] = useState(null)

    useEffect(()=>{
        async function fetchData(){
            const response = await api.get(`/user/get/${user}`).catch((error)=>{ setError(error) })
            .catch(e => setError(error.response.data))
            setData(response.data)
        }
        fetchData()
    },[])

    async function handleSubmit(e){

        e.preventDefault()

        const formData = new FormData()
        formData.append('file', file)

        await api.post('/user/edit', formData).catch((error)=>{
            setError(error)
        })
        navigate(`/profile/${getUser()}`)
    }

    function handleFile(files){ 
        setFile(files[0]) 
        console.log(files[0])
    }

    return(
        !data || error  ? <h1> { error } </h1> :
        <div>
            <form onSubmit={handleSubmit}>
                <UploadAvatar src={data.profileURL} handleFile={handleFile} />
                <button>Edit</button>
            </form>
        </div>
    )


}