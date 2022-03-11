import styled from "styled-components";
import { Link } from 'react-router-dom'




export const Container = styled.div`
    display: grid;
    grid-template-areas: "h h"
                        "m a";
    grid-gap: 10px;
    @media(max-width: 800px) {        
        grid-template-areas: "h h"
                            "a a"
                            "m m";
    }
`;

export const Main = styled.div`
    grid-area: m;
    display: flex;
    //background-color: red;
    justify-content: start;
    align-items: center;

`;
export const Aside = styled.div`
    //background-color: brown;
    grid-area: a;

`;

export const BoxCommunities = styled.div`
    
    width: 200px;
    height: 120px;
    background-color: whitesmoke;
    padding: 16px;

    div{
        display: flex;
        padding: 5px;
    }

    @media(max-width: 800px) {        
        width: 400px;
        margin-left: 10vw;
    }

`;
export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    color: gray;
    :hover{
        color: #262627;
    }
`;

export const BoxItem = styled.div`
    width: 100%;
    border-bottom: 2px solid silver;
    display: flex;
    flex-direction: row;
    align-items: center;
`;