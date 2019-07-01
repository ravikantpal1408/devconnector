import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';
// import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';
import axios from 'axios';


// get current profiles
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    // hit the service 
    axios.get('/api/profile').then(res => {
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    }).catch(err => {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    })
}

// profile loading 
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


// clear profile  
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}