import { createPost, deletePostApi, getTimeline, getUser, likePost } from "../api";
import { CREATE_POST, DELETE_POST, END_LOADING, GET_USER, LIKE_POST, SET_TIMELINE_POSTS, START_LOADING } from "./actionTypes";




export const getTimelinePosts = () => async(dispatch) => {
    dispatch({ type: START_LOADING })
    try {
        const  { data } = await getTimeline()
        dispatch({
            type: SET_TIMELINE_POSTS,
            payload: data
        })
    } catch (error) {
        Promise.reject(error.response.data)
    }
    dispatch({ type: END_LOADING })
}

export const like = (id) => async(dispatch) => {
    try {
        const { data } = await likePost(id)
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    } catch (error) {
        Promise.reject(error)
    }
}

export const getSingleUser = (id) => async(dispatch) => {
    try {
        const { data } = await getUser(id)
        dispatch({
            type: GET_USER,
            payload: data
        })
    } catch (error) {
        Promise.reject(error)
    }
}

export const createUserPost = (payload) => async(dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const { data } = await createPost(payload)
        dispatch({
            type: CREATE_POST,
            payload: data
        })
    } catch (error) {
        Promise.reject(error)
    }
    dispatch({type: END_LOADING})
}

export const deletePostAction = (id , setDisabled) => async(dispatch) => {
    dispatch({type: START_LOADING})
    try {
        await deletePostApi(id)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        setDisabled(false)
    } catch (error) {
        Promise.reject(error)
    }
    dispatch({type: END_LOADING})
}