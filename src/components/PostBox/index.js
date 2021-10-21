import styled from "styled-components";

export const PostBox = styled.div`
    width: 40vw;
    min-width: 400px;
    height: auto;
    background-color: whitesmoke;
    grid-area: m;
    margin-top: 10vh;
    margin-left: 15vw;
    padding: 10px;
    border-radius: 8px;
    h1{
        color: #262627;
    }

    .postBody{
        padding: 5px;

        img{
            max-height: 500px;
            width: 100%;
        }

    }
    .footer{
        margin-top: 5px;
        align-self: flex-end;
        text-align: end;
    }
`
