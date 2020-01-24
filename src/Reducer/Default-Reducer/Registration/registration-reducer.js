export const REGISTER_DATA = 'REGISTER_DATA';

export default (state ='', action) => {
    switch(action.type) {
        case REGISTER_DATA :
            return Object.assign({}, state, action.data);
        default :
            return state;
    }
}