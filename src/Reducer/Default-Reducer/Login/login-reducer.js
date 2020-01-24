export const LOGIN = 'LOGIN';

export default (state = '', action) => {
    console.log(action.type);
    switch (action.type) {
        case LOGIN :
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}