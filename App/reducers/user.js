import {
  SET_USER,
  ALTER_USER,
  ALTER_JUST_USER,
  SET_TOKEN,
  SET_LOCATION,
  DISTANCE_CHANGED,
} from "../actions/types";
import { AsyncStorage } from "react-native";
import ParanuLog from "../Helper/ParanuLog";

const INITIAL_USER = {
  userDetail: "",
  userToken: "",
  loading: true,
  newDistance: ''
};

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case SET_USER:
      // console.log("SET_USER", JSON.parse(action.payload));
      state = Object.assign({}, state, {
        userDetail: JSON.parse(action.payload),
        //userToken: JSON.parse(action.payload).token,
        loading: false
      });
      return state;

    case ALTER_USER:
      //console.log("SET_USER alter", action.payload)
      state = Object.assign({}, state, {
        userDetail: action.payload.user,
        userToken: action.payload.token,
        loading: false
      });
      AsyncStorage.setItem("USER", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("TOKEN", JSON.stringify(action.payload.token));
      return state;

    case ALTER_JUST_USER:
      state = Object.assign({}, state, { userDetail: action.payload });
      AsyncStorage.setItem("USER", JSON.stringify(action.payload));
      return state;

    case SET_TOKEN:
      state = Object.assign({}, state, { userToken: action.payload });
      AsyncStorage.setItem("TOKEN", action.payload)
      return state;
    
    case SET_LOCATION:
      state = Object.assign({}, state, { location: action.payload });
      return state;

    case DISTANCE_CHANGED:
      ParanuLog.debug(`in the distance change reducer ${JSON.stringify(action.payload)}`);
      // state = null
       state = Object.assign({}, state, {newDistance: action.payload});
       ParanuLog.debug(`my state ${JSON.stringify(state)}`);
       return state;
    default:
      return state;
  }
};

export default userReducer;
