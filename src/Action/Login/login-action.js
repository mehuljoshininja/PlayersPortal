import jwt from 'jwt-decode';

import * as LoginServices from '../../Services/Login/login-services';

export const login = (data, props) => {
    console.log('action')
    // debugger
    return (dispatch) => {
        LoginServices.login(data)
            .then((response) => {
                if (response.status === 202) {
                    let token = jwt(response.data.token)
                    if (token.exp > new Date().getTime()) {
                        alert('Unauthorized Acess');
                        props.history.replace('/login')
                    } else {

                        localStorage.setItem('username', response.data.name)
                        localStorage.setItem('role', response.data.role)
                        localStorage.setItem('profile', response.data.profilephoto)
                        localStorage.setItem('token', response.data.token)

                        props.history.replace('/dashboard')
                        window.location.reload();
                    }
                } else if (response.status === 203) {
                    alert('Invalid Username...')
                } else if (response.status === 204) {
                    alert('Invalid Password...')
                }
            })
            .catch((error) => {
                console.log(error);
                alert('Something Went Wrong....')
            });
    }
}