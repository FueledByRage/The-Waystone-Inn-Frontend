import styled from "styled-components";

export const Comment = styled.div`
    height: auto;
    min-height: 70px;
    padding: 4px;
    margin-top: 5px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #dddcdc;

    p{
        margin-top: 5px;
    }
`;

export const CommentHeader = styled.div`
    height: auto;
    font-weight: bold;
    padding: 3px 3px;
    display: flex;
    justify-content: space-between;

    button{
        width: 30px;
        height: 30px;
    }

    span{
        margin-top: -2;
        margin-left: 5px;
    }
`;
