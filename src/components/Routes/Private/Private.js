import React, { useContext } from 'react'; 
import { Redirect, Route } from 'react-router-dom'; 
import { LoginContext } from '../../../context/LoginContext'; 
 
const RoutesPrivate = ({ component: Component, ...rest}) => { 
    const { getUserId , getUserType } = useContext(LoginContext); 
    const UserType = getUserType();

    function Client() {
        if(UserType === "PF" || UserType === "PJ") return true;   
        return false;
    }  


    return ( 
        <Route
            {...rest} 
            render={() => getUserId() 
                ? <Component {...rest} /> 
                : <Redirect to="/login" /> 
            }
            
            render={()=> !Client()
                ? <Component {... rest} />
                : <Redirect to="/unAuthorized"/>
           }
        />
    ) 
} 
 
export default RoutesPrivate;