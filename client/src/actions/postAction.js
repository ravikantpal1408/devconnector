import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POST, POST_LOADING, GET_POSTS, DELETE_POST } from './types'



// Add post
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        })).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


// Add Like
export const addLike = id => dispatch => {
    axios.post('/api/posts/like/' + id)
        .then(res => dispatch(getPost()))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}



// Remove Like
export const removeLike = id => dispatch => {
    axios.post('/api/posts/unlike/' + id)
        .then(res => dispatch(getPost()))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}




// Get posts
export const getPost = () => dispatch => {

    dispatch(setPostLoading());

    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        })).catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}


// Get post
export const getPostUser = (id) => dispatch => {

    dispatch(setPostLoading());

    axios.get('/api/posts/' + id)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        })).catch(err => {
            dispatch({
                type: GET_POST,
                payload: null
            })
        })
}



// delete post 
export const deletePost = (id) => dispatch => {

    dispatch(setPostLoading());

    axios.delete('/api/posts/' + id)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        })).catch(err => {
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        })
}


// set loading state 
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}