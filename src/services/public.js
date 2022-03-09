import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { isLogged } from '../storage/utils';



const PublicRoute = (props) => {

    useEffect(()=>{
        console.log(isLogged());
    },[]);

    if(!isLogged()) return (  <Route path={props.path} component = {props.component} element={props.element}/> )
    else return (<></>)
}

export default PublicRoute