import { SET_INDEX_OF_PET, SET_YOUR_PET, GET_ALL_PETS,GET_ALL_ADS, GET_ALL_MATCH_LIST } from '../actions/types';

const INITIAL_USER = {
    yourPetDetail : '',
    petIndex : 0,
    allPets : '',
    allAds:'',
    allMatchList : '',
    loading:true
};

const petReducer = (state = INITIAL_USER, action) => {
    switch (action.type) {
    case SET_YOUR_PET:
        state = Object.assign({}, state, { yourPetDetail: action.payload, loading:false });
        return state;

    case SET_INDEX_OF_PET:
        state = Object.assign({}, state, { petIndex: action.payload, loading:false });
        return state;

    case GET_ALL_PETS:
        state = Object.assign({}, state, { allPets: action.payload, loading:false });
        return state;
    case GET_ALL_ADS:
        state = Object.assign({}, state, { allAds: action.payload, loading:false });
        return state;
    case GET_ALL_MATCH_LIST:
        state = Object.assign({}, state, { allMatchList: action.payload, loading:false });
        return state;
    default:
        return state;
    }
};

export default petReducer;
