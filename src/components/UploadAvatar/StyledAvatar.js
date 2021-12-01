import styled from "styled-components"


export const StyledAvatar = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    border-radius: 100px;
    background-size: cover; 
    background-position: 50% 50%;
    display: flex;
    flex-wrap: wrap;    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    :hover{
            p{
                opacity: 1;
            }
    }
    p{
        margin-left: 42%;
        font-weight: bold;
        font-size: large;
        opacity: 0.0;
    }
    span{
        margin-left: 25%;
        font-weight: bold;
        
    }
`