import IndexService from '../index-service';

export function login(data) {
    // console.log('service : ', data)
    return IndexService.post('/user/login',data)
}

export default login;

