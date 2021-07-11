import React, { useContext } from 'react'; 
import {Redirect, Route} from 'react-router-dom'; 
import {LoginContext} from '../../../context/LoginContext'; 
 
const RoutesPrivate = ({ component: Component, ...rest}) => { 
    const { getToken } = useContext(LoginContext); 
 
    return ( 
        <Route 
            {...rest} 
            render={() => getToken() 
                ? <Component {...rest} /> 
                : <Redirect to="/login" /> 
            } 
        /> 
    ) 
} 
 
export default RoutesPrivate;