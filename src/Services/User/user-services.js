import IndexService from '../index-service';

export function register(data) {
    return IndexService.post('/user/register', data)
}

