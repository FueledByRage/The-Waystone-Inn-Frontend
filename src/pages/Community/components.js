import styled from 'styled-components';


export const Header = styled.div`
    padding: 16px;
    display: flex;
    max-width: 100vw;
    width: 100%;
    align-items: center;
    background-color: white;

    h1{
        margin-left: 10vw;
        color: #262627;
    }

    button{
    }
    `
export const StyledButton = styled.button`
    height: 40px;
    margin-top: 0;
    margin-left: 20px;
    background-color: #F33850;
    width: 100px;
`

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 100vw;
    @media(max-width: 830px) { 
        flex-direction: column;       
        display: block;
    }
    `
    export const Main = styled.div`
        display: flex;
        width: 70%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media(max-width: 820px) {
            width: 100%;
            justify-content: center;
            align-items: center;
        }
`
export const Aside = styled.div`
    display: flex;
    flex-direction : column;
    align-items:center;
    width: 30%;

    @media(max-width: 820px) {
        width: 100%;
        justify-content: center;
    }
`


export const StyledForm = styled.form`
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    min-width: 400px;
    background-color: whitesmoke;
    align-items: center;
    margin-top: 25px;
    border-radius: 10px;
    button{
        margin-top: 10px;
        align-self: flex-end;
    }
    
`

export const PostsContainer = styled.div`
    margin-top: 15px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    min-width: 400px;
    align-items: center;
`


export const StyledInput = styled.textarea`
    padding: 5px;
    background-color: transparent;
    min-width: 300px;
    width: 90%;
    margin-top: 20px;
    
`

export const ErrorBox = styled.div`
    margin-top: 20px;
    margin-left: 5vw;
`
export const FooterButtons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 40vw;
    margin-top: 25px;
    min-width: 400px;
    button{
        max-width: 100px;
    }
`;