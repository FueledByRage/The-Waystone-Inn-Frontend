import styled from 'styled-components';


export const Header = styled.div`
    padding: 16px;
    display: flex;
    
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
    
    @media(max-width: 800px) {        
        display: block;
  }
`
export const Main = styled.div`
    width: 60vw;
    align-items: center;
    justify-content: center;
    padding-top: 10vh;

    .footerButtons{
        display: flex;
        justify-content: space-between;
        margin-left: 14.5vw;
        width: 40vw;
        min-width: 400px;
        button{
            max-width: 100px;
        }
    }
`
export const Aside = styled.div`

    display: flex;
    padding: 16px;
    justify-content: end;
    align-content: flex-end;
    width: 40vw;
    margin-right: 0px;

    @media(max-width: 800px) {
        margin-left: 45vw;
    }
`


export const StyledForm = styled.form`
    margin-left: 15vw;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    min-width: 400px;
    background-color: whitesmoke;
    align-items: center;
    border-radius: 10px;
    button{
        margin-top: 10px;
        align-self: flex-end;
    }
    
`

export const PostsContainer = styled.div`
    margin-top: 15px;
    margin-left: 15vw;
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 40vw;
    min-width: 400px;
    align-items: center;
    margin-left: 7vw;
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