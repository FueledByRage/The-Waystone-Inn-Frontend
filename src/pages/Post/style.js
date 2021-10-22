import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    display: grid;
    grid-template: "m a"
                    "c c";
    .aside{
        width: 20vw;
        grid-area: a;
        width: 20vw;
        margin-left: 10vw;
        @media(max-width: 800px) {
            margin-left: 35vh;
            justify-items: center;
            max-width: 900px;
        }
    }
    @media(max-width: 800px) {        
        grid-template-areas: "a a"
                            "m m"
                            "c c";
    }
`


export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    color: #262627;
    :hover{
        color: black;  
    }
`
export const CommentsBox = styled.div`
    margin-top: 10px;
    grid-area: c;
    background-color: whitesmoke;

    width: 40vw;
    min-width: 400px;
    margin-left: 15vw;
    padding: 5px;
`

export const StyledForm = styled.form`

    padding: 5px;
    display: flex;
    flex-direction: column;
    min-width: 400px;
    align-items: center;
    border-radius: 10px;
    textarea{
        padding: 5px;
        border: none;
        width: 100%;
    }
    button{
        min-width: 120px;
        height: 35px;
        margin-top: 10px;
        align-self: flex-end;
    }
    
`