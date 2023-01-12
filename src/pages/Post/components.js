import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerPost = styled.div`
    padding: 0px 0px 20px 0px;
    display: grid;
    grid-template: "m a"
                    "c c";
    .aside{
        grid-area: a;
        width: 20vw;
        height: 250px;
        margin-left: 10vw;
        margin-top: 8vh;
        @media(max-width: 800px) {
            margin-left: 35vh;
            justify-items: center;
            max-width: 900px;
        }
    }
    @media(max-width: 800px) {
        justify-content: center;
        .aside{
            margin-left: 20vw;
            align-self: center;
        }
        div{
            margin: 5px 0 0;
        }
        grid-template-areas: "a a"
                            "m m"
                            "c c";
    }
`;


export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    color: #262627;
    :hover{
        color: black;  
    }
`;
export const CommentsBox = styled.div`
    margin-top: 10px;
    grid-area: c;
    background-color: whitesmoke;
    width: 40vw;
    min-width: 400px;
    margin-left: 15vw;
    padding: 10px;
`;

export const StyledFormComment = styled.form`
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    border-radius: 10px;
    textarea{
        padding: 10px;
        border: none;
        width: 100%;
        border: 1px solid silver;
    }
    button{
        min-width: 120px;
        height: 35px;
        align-self: flex-end;
    }
`;