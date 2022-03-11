import styled from "styled-components";


export const Container = styled.div`
    width: 40vw;
    max-width: 400;
    display: grid;
    
    margin-left: 10vw;
    align-items: center;
    justify-items: center;
`
export const ErrorBox = styled.div`
    
`


export const PostBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 15fr;
    grid-template-areas: "l b b"
                        "l b  b"
                        "l f f";
    margin-top: 10px;
    width: 80%;
    min-width: 400px;
    background-color: whitesmoke;
    padding: 5px;
    border-radius: 5px;
    
    
    .postBody{
        grid-area: b;
        display:flex;
        flex-direction: column;
        padding: 5px;
        img{    
            max-height: 400px;
            object-fit: contain;
        }
    }
    .footer{
        position: relative;
        grid-area: f;
        width: 100%;
        padding: 5px;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        span{
            font-size: 7px;
            font-weight: 600;
        }
        a{
            :hover{
                div{
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                } 
            }
        }
    }
    :hover{
        border: 1px solid;
    }
` 
export const PostText = styled.div`
    padding: 5px;
        img{    
            max-height: 400px;
            object-fit: contain;
        }
`
export const PostFooter = styled.div`
        width: 100%;
        padding: 5px;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        span{
            font-size: 7px;
            font-weight: 600;
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
        width:20vw; 
        max-width: 90px;
    }
`