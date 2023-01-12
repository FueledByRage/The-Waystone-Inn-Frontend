import styled from "styled-components";


export const ContainerFeed = styled.div`
    width: 50vw;
    min-width: 400px;
    min-height: 80vh;
    display: grid;
    margin-left: 10vw;
    align-items: center;
    justify-items: center;
`
export const ErrorBox = styled.div`
    
`


export const PostFeed = styled.div`
    display: grid;
    grid-template-columns: 1fr 15fr;
    grid-template-areas: "t t"
                        "b  b"
                        "f f";
    margin-top: 10px;
    width: 80%;
    min-height: 100px;
    min-width: 400px;
    background-color: whitesmoke;
    padding: 5px;
    border-radius: 5px;
    transition: .5s;
    padding: 5px;
    :hover{
        border: 1px solid;
    }
` 

export const PostFeedTitle = styled.div`
    grid-area: t;
`;
export const PostFeedBody = styled.div`
    grid-area: b;
    display:flex;
    flex-direction: column;
    padding: 5px;
    img{
        max-height: 400px;
        object-fit: contain;
    }
`;

export const PostFeedFooter = styled.div`
    position: relative;
    grid-area: f;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    span{
        font-size: 7px;
        font-weight: 600;
    }

    a:nth-child(1):hover{
        div{
            display: flex;
            flex-direction: column;
            position: absolute;
        } 
    }
`;


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