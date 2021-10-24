import React from 'react'
import { Link, Route} from 'react-router-dom'
import { getToken, isLogged } from '../storage/utils'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login'
import { Header } from '../pages/Home/style'




const PrivateRoute = (props) => {



    if(getToken()) return ( 
    <div>

        <Route path={props.path} component = {props.component} element={props.element}/> 
    </div>
    
    )
    else return ( <Login /> )

}


export default PrivateRoute