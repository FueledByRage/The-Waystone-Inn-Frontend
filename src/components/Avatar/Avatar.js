import React from 'react'
import Avatar from 'react-avatar'
import styled from 'styled-components'


const StyledAvatar = styled(Avatar)`
    border-radius: 100px;
`

export default (props) => <StyledAvatar {...props} />