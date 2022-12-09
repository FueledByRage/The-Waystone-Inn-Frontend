import React from 'react';
import { Route } from 'react-router-dom';
import { isLogged } from '../storage/utils';



const PublicRoute = (props) => {
    if(!isLogged()) return ( <Route path={props.path} component = {props.component} element={props.element}/> )
    else return (<></>)
}

export default PublicRoute