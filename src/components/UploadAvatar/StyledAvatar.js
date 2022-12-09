import styled from "styled-components"


export const StyledAvatar = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${props => props.src});
    border-radius: 100px;
    border: 2px solid #bdbcb9;
    background-size: cover; 
    background-repeat: no-repeat;
    background-position: 50% 50%;
    display: flex;
    flex-wrap: wrap;    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-text: center;

    p{
        margin-left: -4px;
        font-weight: bold;
        font-size: large;
    }
    span{
        margin-left: 25%;
        font-weight: bold;
    }
`