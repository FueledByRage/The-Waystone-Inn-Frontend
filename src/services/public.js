import React from 'react';
import { Route } from 'react-router-dom';
import { isLogged } from '../storage/utils';
import ErrorPage from '../pages/ErrorPage';


const PublicRoute = (props) => {

    if(!isLogged()) return  (  <Route path={props.path} component = {props.component} element={props.element}/> )
    else return ( <ErrorPage message={'You are already logged!'} />)

}

export default PublicRoute