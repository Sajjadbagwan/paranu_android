import { SET_USER, ALTER_USER,ALTER_JUST_USER,SET_TOKEN, SET_LOCATION, DISTANCE_CHANGED } from './types';

function setUser(user) {
    return (dispatch) => {dispatch({type: SET_USER, payload:user})};
}
function setToken(token) {
    return (dispatch) => {dispatch({type: SET_TOKEN, payload:token})};
}

function alterUser(user) {
    return (dispatch) => {dispatch({type: ALTER_USER, payload:user})};
}
function alterJustUser(user) {
    return (dispatch) => {dispatch({type: ALTER_JUST_USER, payload:user})};
}
function setLocation(location) {
    return (dispatch) => {dispatch({type: SET_LOCATION, payload: location})}
}
function setDistance(newDistance) {
    return (dispatch) => {dispatch({ type: DISTANCE_CHANGED, payload: newDistance})};
}


export { setUser,alterUser,alterJustUser,setToken, setLocation, setDistance };
