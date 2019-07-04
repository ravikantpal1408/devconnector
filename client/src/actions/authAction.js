import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// register user
export const registerUser = (userData, history) => (dispatch) => {

    axios.post('/api/users/register', userData)
        .then(user => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );

};

// login user 
export const loginUser = (loginData, history) => (dispatch) => {
    axios.post('/api/users/login', loginData)
        .then(user => {

            const { token } = user.data;
            localStorage.setItem('jwtToken', token);
            // set token to Auth Header
            setAuthToken(token);
            // decode token to get user data 
            const decoded = jwt_decode(token);
            // set current user 
            dispatch(setCurrentUser(decoded));

        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


// set logged in user 
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}


// log out user
export const logoutUser = () => dispatch => {
    // remove token from loacl storage
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    // set current user to empty object which will set isAuthenticated to false 
    dispatch(setCurrentUser({}));
    window.location.href = "/"

}