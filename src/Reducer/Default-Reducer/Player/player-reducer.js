export const FETCH_DATA = 'FETCH_DATA';

export default (state ='', action) => {
    switch(action.type) {
        case FETCH_DATA :
            return Object.assign({}, state, action.data);         
        default :
            return state;
    }
}