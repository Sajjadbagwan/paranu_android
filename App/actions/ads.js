
import { GET_ALL_ADS } from './types';


function getAllads(ads) {
    return (dispatch) => {dispatch({type: GET_ALL_ADS, payload:ads})};
}



export { getAllads };
