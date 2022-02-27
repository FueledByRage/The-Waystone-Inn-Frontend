import styled from "styled-components"; 

export const DropContainer = styled.div.attrs({
    className: 'dropZone'
})`
    width: 90%;
    margin-top: 5px;
    background-color: #bfbfbf;
    height: 15%;
    display: flex;
    padding: 5px;
    border-radius: 4px;
    justify-content: center;
`

const messageColors = {
    default: "black",
    error: "#e57878",
    success: "#04400a"
  };

export const UploadMessage = styled.p`
    color: ${props => messageColors[props.type || 'default']};
`
