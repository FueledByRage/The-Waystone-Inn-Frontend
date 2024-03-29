import React from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    color: gray;
    :hover{
        color: #262627;
    }
`

export default (props) => <StyledLink {...props} />