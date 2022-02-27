import React from 'react'
import { Route} from 'react-router-dom'
import { getToken } from '../storage/utils'
import Login from '../pages/Login'


const PrivateRoute = (props) => {

    if(getToken()) return ( 
    <div>
        <Route path={props.path} component = {props.component} element={props.element}/> 
    </div>
    
    )
    else return ( <Login /> )

}


export default PrivateRoute