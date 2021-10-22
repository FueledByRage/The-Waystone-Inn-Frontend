import styled from "styled-components";


export const Container = styled.div`
    width: 40vw;
    max-width: 400;
    display: grid;
    
    margin-left: 10vw;
    align-items: center;
    justify-items: center;
`



export const PostBox = styled.div`
    margin-top: 10px;
    width: 80%;
    min-width: 400px;
    background-color: whitesmoke;
    padding: 5px;
    border-radius: 5px;
   
    .postBody{
        padding: 5px;
        img{    
            max-height: 400px;
            object-fit: contain;
        }

    }
    .footer{
        padding: 5px;
        text-align: end;
        bottom: 0;
        span{
            font-size: 12px;
            font-weight: 600;
        }
    }
` 
export const StyledFooter = styled.div`
    margin-top: 10px;
    display: flex;
    min-width: 400px;
    width: 80%;
    justify-content: space-between;
    button{
        height: 40px;
        min-width: 100px;
    }
`