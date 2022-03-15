import styled from 'styled-components'


export const PopUp = styled.div`
    display: none;
    position: absolute;
    width: 200px;
    background-color: #dddcdc;
    min-height: 100px;
    padding: 10px;
    top: -100px;
    border-radius: 5px;
    font-weight: bold;
    border: white 1px solid;
`

export const Title = styled.div`
    width: 95%;
    border-bottom: 1px solid silver;
`

export const About = styled.div`
    padding: 5px;
    top: 30px;
    width: 100%;
    font-size: 1rem;
`

export const Footer = styled.div`
    position: absolute;
    top: 50px;
    width: 100%;
`