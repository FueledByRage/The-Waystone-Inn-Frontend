import styled from "styled-components";


export const Search = styled.div`
    margin-left: 5px;
    input{
        border-radius: 5px;
        padding: 8px;
        background-color: #1A1A1B;
        width: 25vw;
        border-width: 0.1em;
        border-style: solid;
        border-color: white;
        color: white;
    }
`;

export const DataResult = styled.div`
    background-color: white;
    align-content: center;
    position: absolute;
    z-index: 5;
    width: 25vw;
    .dataIten{
        height: 40px;
        :hover{
            background-color: gray;
        }
        padding-top: 10px;

        border-top: 0.01rem solid black;
        p{
            color: red;
            padding-left: 10px;
        }
    }
`