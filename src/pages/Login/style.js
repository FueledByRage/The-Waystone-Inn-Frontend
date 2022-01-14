import styled from "styled-components";


export const StyledForm = styled.div`

    border-radius: 20px;
    padding: 20px;
    background-color: white;
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 20%;
    left: 40vw;
    width: 320px;
    height: 400px;
    text-align: center;

    form{
        background-color: transparent;
    }

    button{
        width: 40%;
        height: 40px;
        align-self: center;
    }
    @media(max-width: 800px) {
        margin-left: 2px;
    }

    form input:focus + label, input:not(:placeholder-shown) + label{
    transform: translateY(-22px) scale(0.8);
    }
    form input::placeholder{
    color: transparent;
    }
`

export const StyledInput = styled.input`
    width: 90%;
    padding: 14px 10px;
    text-align: left;
    font-size: 15px;
    margin: 20px auto;
    border: none;
    border-bottom: 2px solid silver;
`
export const StyledLabel = styled.label`
    color: #F33850;
    top: 30%;
    left: 38px;
    position: absolute;
    pointer-events: none;
    transform-origin: 0 0;

`

export const StyledLabelPassword = styled.label`
    color: #F33850;
    position: absolute;
    pointer-events: none;
    transform-origin: 0 0;
    top: 52%;
    right: 70%;
`
export const StyledText = styled.div`
    margin-top: 10%;
    margin-bottom: 3%;
    top: 30%;
`