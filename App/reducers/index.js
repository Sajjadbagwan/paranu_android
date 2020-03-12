import {combineReducers} from 'redux'
import userReducer from  './user'
import petReducer from './pet'
import messageReducer from './messageData'
import appStateReducer from './appState'

const reducer =combineReducers({
    user:userReducer,
    pet:petReducer,
    messageData:messageReducer,
    appState:appStateReducer
})
export default reducer;