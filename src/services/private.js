import React from 'react'
import { Link, Route} from 'react-router-dom'
import { getToken, isLogged } from '../storage/utils'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'




const PrivateRoute = (props) => {



    if(getToken()) return ( <Route path={props.path} component = {props.component} element={props.element}/> )
    else return ( <Login /> )

}


export default PrivateRoute