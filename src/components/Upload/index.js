import React from "react";

import DropZone from 'react-dropzone'

import { DropContainer, UploadMessage } from "./DropContainer";

export default function Upload(props){
    const { onUpload } = props
    
    const renderDragMessage = (isDragActive, isDragReject) => {
        if(!isDragActive) return <UploadMessage> Drag and drop the image here  </UploadMessage>
    
        if(isDragReject) return <UploadMessage type = "error" > Not supported file </UploadMessage>
    
        return <UploadMessage type= 'success' > Drop here </UploadMessage>
    }
    return (
        <DropZone accept='image/*' onDropAccepted={onUpload} multiple={false}>
        {
            (
                {getRootProps, getInputProps, isDragActive, isDragReject})=>(
                <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()} />
                    { renderDragMessage(isDragActive, isDragReject) }
                </DropContainer>
            )
        }
        </DropZone>
    )

}

