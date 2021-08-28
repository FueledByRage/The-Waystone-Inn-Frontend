import React from 'react'
import { getToken, isLogged } from '../storage/utils'


export default function ErrorPage(props){

    return(

        <div>
            <h1>
                {props.message}
            </h1>
        </div>

    )


}