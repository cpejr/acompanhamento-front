import React, { useContext } from 'react'; 
import { Redirect, Route } from 'react-router-dom'; 
import { LoginContext } from '../../../context/LoginContext'; 
 
const RoutesPrivate = ({ component: Component, ...rest}) => { 
    const { getToken , getUserType } = useContext(LoginContext); 
    const userType = getUserType();

    function isClient() {
        if (userType === "PF" || userType === "PJ") return true;   
        return false;
    }  

    return ( 
        <Route
            {...rest} 
            render={() => !!getToken() 
                ? !isClient()
                    ? <Component {... rest} />
                    : <Redirect to="/unAuthorized" />
                : <Redirect to="/login" /> 
            }
        />
    ) 
} 
 
export default RoutesPrivate;