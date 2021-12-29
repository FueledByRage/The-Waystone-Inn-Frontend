import styled from "styled-components";

export const PostBox = styled.div`
    grid-template-columns: 1fr 15fr;
    display: grid;
    grid-template-areas: " l t t"
                        "l b b"
                        " l f f";
    width: 40vw;
    min-width: 400px;
    height: auto;
    background-color: whitesmoke;
    grid-area: m;
    margin-top: 10vh;
    margin-left: 15vw;
    padding: 10px;
    border-radius: 8px;
    
    .title{
        display: flex;
        justify-content: space-between;
        grid-area: t;
    }

    h1{
        color: #262627;
    }

    .postBody{
        padding: 5px;
        white-space: pre-wrap;
        grid-area: b;
        img{
            max-height: 500px;
            width: 100%;
        }

    }
    .footer{
        grid-area: f;
        margin-top: 5px;
        display: flex;

        justify-content: space-between;
    }
`
