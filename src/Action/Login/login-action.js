import jwt from 'jwt-decode';

import * as LoginServices from '../../Services/Login/login-services';
// import { LOGIN } from '../../Reducer/Default-Reducer/Login/login-reducer';

export const  login = (data,props) =>{
    console.log('action')
    // debugger
    return(dispatch) => {
        //console.log('action dis')
        LoginServices.login(data)
        .then( (response) => {
            //console.log('action then')
            if(response.status === 202) {
                //console.log(response.data);

                console.log('jwt : ',jwt(response.data.token))
                let token = jwt(response.data.token)
                //console.log(token.exp)
                if(token.exp > new Date().getTime()){
                    alert('Unauthorized Acess');
                    props.history.replace('/login')
                } else {                    
          
                    localStorage.setItem('username',response.data.name)
                    localStorage.setItem('role',response.data.role)
                    localStorage.setItem('profile',response.data.profilephoto)
                    localStorage.setItem('token',response.data.token)
                    // dispatch({
                    //     type: LOGIN,
                    //     data: response.data
                    // })
                    props.history.replace('/dashboard')
                    window.location.reload();
                }
            } else if(response.status === 203) {
                alert('Invalid Username...')
            } else if(response.status === 204) {
                alert('Invalid Password...')
            }
        })
        .catch( (error) => {
            console.log(error);
            alert('Something Went Wrong....')
        });
    }
}