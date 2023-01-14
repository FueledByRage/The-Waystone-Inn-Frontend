import styled from "styled-components";

export const PostBox = styled.div`
    grid-template-columns: 1fr 25fr;
    display: grid;
    grid-template-areas: " l t t"
                        "l b b"
                        "l f f";
    width: 40vw;
    min-width: 400px;
    background-color: whitesmoke;
    grid-area: m;
    margin-top: 10vh;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;

    h1{
        color: #262627;
    }
`;

export const PostTitle = styled.div`
    display: flex;
    justify-content: space-between;
    grid-area: t;
    button{
        align-self: start;
    }
`;

export const PostBody = styled.div`
    padding: 5px;
    white-space: pre-wrap;
    grid-area: b;
    img{
        max-height: 500px;
        width: 100%;
    }
`;
export const PostFooter = styled.div`
    grid-area: f;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

export const LikeBox = styled.div`
    display: flex;
    grid-area: l;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px;
    margin-right: 10px;
    span{
        margin-left: 5px;
        font-weight: bold;
    }
    button{
        border: none;
        width: 20px;
        height: 20px;
    }
`;