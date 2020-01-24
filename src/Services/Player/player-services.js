import IndexService from '../index-service';

export function addPlayer(data) {
    return IndexService.post('/player/register',data)
}

export function editPlayer(data) {
    return IndexService.patch('/player/edit-player',data)
}

export function deletePlayer(data) {
    return IndexService.post('/player/delete-player',data)
}

export function fetchData() {
    return IndexService.get('/player/viewplayers');
}

