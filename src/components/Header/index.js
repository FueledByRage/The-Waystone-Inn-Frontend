import styled from "styled-components";

const Header = styled.div`
    height: 10vh;
    grid-area: h;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;
    background-color: #262627;
    a{
        color: white;
        text-decoration: none;
        :hover{
            color: gray;
        }
    }
    .title{
        font-size: 20px;
        color: white;
    }

    `
export default Header