import React,{ useNavigate } from 'react';
import { Route } from 'react-router';



 const Redirect = (props)=>{

    <Route path={props.path} component={props.component} element={props.element}/>

}

export default Redirect