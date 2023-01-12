import React, { useState } from "react";
import { StyledAvatar } from "./StyledAvatar";
import DropZone from 'react-dropzone'
import { FiCamera, FiCheckCircle, FiXSquare } from "react-icons/fi";


export default function UploadAvatar(props){

    const [ source, setSource ] = useState(props.src)

    function renderFeedback(isDragActive, isDragReject){
        if(!isDragActive) return <FiCamera />

        if(isDragReject) return <FiXSquare />

        return <FiCheckCircle />
    }

    function handleFile(files){
        setSource(URL.createObjectURL(files[0]))
        props.handleFile(files)
    }

    
    return(
        <StyledAvatar src={ source }  >
            <DropZone accept='image/*' onDropAccepted={handleFile} multiple={false}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject })=>(
                <div
                    {...getRootProps()}
                > 
                    <input {...getInputProps()} />
                    { source != props.src ? <span> Preview </span> : <p>{ renderFeedback(isDragActive, isDragReject) }</p>}
                </div>
            )}
            </DropZone>
        </StyledAvatar>
    )

}