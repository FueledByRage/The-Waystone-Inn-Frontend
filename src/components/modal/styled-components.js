import styled  from 'styled-components';

export const ModalBox = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    display:flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: rgba(0,0,0,.5);
    .close-button{
        background-color: #F33850;
        font-size: 16px;
        border: 0;
        border-radius: 8px;
        font-weight: 700;   
        color: white;
        outline: none;
        position: absolute;
        right: 10px;
        top: 10px;
        width: 40px;
    }
`;