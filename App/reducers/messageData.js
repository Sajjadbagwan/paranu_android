import { SET_ALL_MESSAGE,UPDATE_MESSAGES } from '../actions/types';

const INITIAL_MESSAGE = {
    allMessages : '',
    loading:true
};

const messageReducer = (state = INITIAL_MESSAGE, action) => {
    switch (action.type) {
    case SET_ALL_MESSAGE:
        state=null
        state = Object.assign({}, state, { allMessages: action.payload, loading:false });
        return state;
        case UPDATE_MESSAGES:
        state=null
        state = Object.assign({}, state, { allMessages: action.payload, loading:false });
        return state;

    default:
        return state;
    }
};

export default messageReducer;