import React, { useContext } from 'react'; 
import { Redirect, Route } from 'react-router-dom'; 
import { LoginContext } from '../../../context/LoginContext'; 
 
const RoutesPublic = ({ component: Component, restricted , ...rest}) => { 
    const { getUserId , getUserType } = useContext(LoginContext);


    return ( 
        <Route
            {...rest} 
            render={() => getUserId() && restricted 
                ? <Component {...rest} /> 
                : <Redirect to="/unAuthorized" /> 
            }
            
        />
    ) 
} 
 
export default RoutesPublic;