import React, { Component } from "react";

import DropZone from 'react-dropzone'

import { DropContainer, UploadMessage } from "./DropContainer";


export default class Upload extends Component{

    renderDragMessage = (isDragActive, isDragReject) => {
        if(!isDragActive) return <UploadMessage> Drag and drop the image here  </UploadMessage>

        if(isDragReject) return <UploadMessage type = "error" > Not supported file </UploadMessage>

        return <UploadMessage type= 'success' > Drop here </UploadMessage>
    }

    
    render(){

        const { onUpload } = this.props

        return (<DropZone accept='image/*' onDropAccepted={onUpload} multiple={false} >
            {({getRootProps, getInputProps, isDragActive, isDragReject})=>(
                <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()} />
                    { this.renderDragMessage(isDragActive, isDragReject) }
                </DropContainer>
            )}
        </DropZone>)
    }
}