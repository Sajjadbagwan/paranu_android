import { SET_ALL_MESSAGE,UPDATE_MESSAGES } from './types';

function setAllMessage(messages) {
    return (dispatch) => {dispatch({type: SET_ALL_MESSAGE, payload:messages})};
}
function updateMessage(messages) {
    return (dispatch) => {dispatch({type: UPDATE_MESSAGES, payload:messages})};
}




export { setAllMessage,updateMessage };
