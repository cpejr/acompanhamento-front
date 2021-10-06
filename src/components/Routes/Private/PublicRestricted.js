import React, { useContext } from 'react'; 
import { Redirect, Route } from 'react-router-dom'; 
import { LoginContext } from '../../../context/LoginContext'; 
 
const RoutesPublic = ({ component: Component, restricted , ...rest}) => { 
    const { getToken } = useContext(LoginContext);


    return ( 
        <Route
            {...rest} 
            render={() => getToken() && restricted 
                ? <Component {...rest} /> 
                : <Redirect to="/unAuthorized" /> 
            }

            // render={() => getToken() 
            //     ? !isClient()
            //         ? <Component {... rest} />
            //         : <Redirect to="/unAuthorized" />
            //     : <Redirect to="/login" /> 
            // }
            
        />
    ) 
} 
 
export default RoutesPublic;