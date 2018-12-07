import types from '../actions/actionTypes';
export default function courseReducer(state=[], action){
    switch(action.type){
        
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;//[...state, Object.assign({}, action.course)]; 
        default:
            return state;
    }
}