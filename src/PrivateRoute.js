import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => { 
    console.log(Component);
    return(
    <Route {...rest} render={(props) => (
        true
        ? <Component {...props}/>
        : <Redirect to='/auth/login' />
    )} />
)}

export default PrivateRoute;