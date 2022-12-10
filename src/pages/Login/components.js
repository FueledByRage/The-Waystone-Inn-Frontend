import styled from "styled-components";

export const ContainerLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    width: 100%;
    height: 80vh;
`;

export const StyledFormLogin = styled.form`
    position: relative;
    width: 25vw;
    height: 70vh;
    min-width: 350px;
    border-radius: 20px;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    img{
        width: 100px;
        height: 100px;
    }
    button{
        align-self: center;
    }
`;

export const StyledLabelEmail = styled.label`
    color: #F33850;
    position: absolute;
    pointer-events: none;
    transform-origin: 0 0;
`;

export const StyledLabelPassword = styled.label`
    color: #F33850;
    position: absolute;
    pointer-events: none;
    transform-origin: 0 0;
`;

export const StyledInputLogin = styled.input`
    background: transparent;    
    width: 90%;
    padding: 14px 10px;
    text-align: left;
    font-size: 15px;
    margin: 20px auto;
    border: none;
    border-bottom: 2px solid silver;
`;