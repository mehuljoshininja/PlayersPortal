// export const REGISTER_DATA = 'REGISTER_DATA';
export const FETCH_DATA = 'FETCH_DATA';
// export const EDIT_DATA = 'EDIT_DATA';
// export const DELETE_DATA = 'DELETE_DATA';

export default (state ='', action) => {
    switch(action.type) {
        // case REGISTER_DATA :
        //     return Object.assign({}, state, action.data);
        case FETCH_DATA :
            return Object.assign({}, state, action.data);
        // case EDIT_DATA :
        //     return Object.assign({}, state, action.data);
        // case DELETE_DATA :
        //     return Object.assign({}, state, action.data);             
        default :
            return state;
    }
}