
import { SET_INDEX_OF_PET, SET_YOUR_PET, GET_ALL_PETS, GET_ALL_MATCH_LIST } from './types';


function setYourPet(pet) {
    return (dispatch) => {dispatch({type: SET_YOUR_PET, payload:pet})};
}

function setIndexOfPet(index) {
    return (dispatch) => {dispatch({type: SET_INDEX_OF_PET, payload:index})};
}

function getAllPets(pets) {
    return (dispatch) => {dispatch({type: GET_ALL_PETS, payload:pets})};
}

function getAllMatchList(matchlist) {
    return (dispatch) => {dispatch({type: GET_ALL_MATCH_LIST, payload:matchlist})};
}


export { setYourPet,setIndexOfPet,getAllPets,getAllMatchList };
