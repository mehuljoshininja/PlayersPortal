import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import jwt_token from 'jwt-decode'

class CustomRout extends React.Component {
    getExtractJson({ component, cprivate, ...rest }){
        return rest;
    }
    render() {
        const rest = this.getExtractJson(this.props);
        let isLoggedIn=0;
        const token = localStorage.getItem('token');
        const date =new Date()

        if(token){
            if(date.getTime()/1000 < jwt_token(token).exp ){
                isLoggedIn=1;
            } else {
                localStorage.removeItem('profile')
                localStorage.removeItem('username')
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                isLoggedIn=0;
                alert('Session Time Out...')
            }
        }
        // console.log(rest)
        const userCurrentRole = localStorage.getItem('role');
        const { component, cprivate , crole} = this.props;
        const Component = component;
        let redirectTo = undefined;

        if(!isLoggedIn && rest.path !== '/login' && rest.path !== '/logout'){
            alert('Please Authenticate.....')
            redirectTo='/logout';
        } else if(isLoggedIn && cprivate && rest.path === '/login' && userCurrentRole === 'admin') {
            redirectTo = '/dashboard';
        } else if(isLoggedIn && userCurrentRole === 'user' && rest.path === '/dashboard'){
            redirectTo = '/user-dashboard'; 
        } else if(isLoggedIn && cprivate && crole && crole.filter((item) => item === userCurrentRole).length === 0) {       
            redirectTo  = '/unauthorized-access';
        } 

        return(
            <Route
                {...rest}
                render = {props => (
                    (redirectTo)
                        ? <Redirect to={{pathname:redirectTo, state:{from:props.location}}} />
                        : <Component {...props} />
                )}
            />
        )
    }
}

export default CustomRout;