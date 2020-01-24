import * as UserServices from '../../Services/User/user-services';

export const register = (data, props) => {
    return(dispatch) =>{
        //console.log('Before action')
        UserServices.register(data)
        .then((response) => {
            if(response.status === 200){
                alert('Register Successfully....');
                props.history.push('/login');
            }
        })
        .catch((error) => {
            console.log('Something Went Wrong : ',error)
            alert('Something Went Wrong... Please Try Again...');
        })
    }
}