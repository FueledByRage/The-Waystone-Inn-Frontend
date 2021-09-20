import styled,{ css } from "styled-components"; 

export const DropContainer = styled.div.attrs({
    className: 'dropZone'
})`
    margin-top: 5px;
    background-color: #bfbfbf;
    height: 15%;
    display: flex;
    padding: 5px;
    border-radius: 4px;
    justify-content: center;
    align-itens: center;

`

const messageColors = {
    default: "#999",
    error: "#e57878",
    success: "#78e5d5"
  };

export const UploadMessage = styled.p`
    color: ${props => messageColors[props.type || 'default']}
    background-color: whitesmoke;
`
