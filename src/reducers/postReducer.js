import { CREATE_POST, DELETE_POST, GET_USER, LIKE_POST, SET_TIMELINE_POSTS } from "../actions/actionTypes"

export default (state = { posts: [] , postUsers: [] }, action) => {
    switch (action.type) {
        case SET_TIMELINE_POSTS: 
            return {
                ...state,
                posts: action.payload
            }
        case LIKE_POST:
            return {
                ...state , 
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            }
        case GET_USER: 
            state.postUsers.push(action.payload)
            return state
        case CREATE_POST: 
            return {
                ...state,
                posts: [...state.posts,action.payload]
            }
        case DELETE_POST: 
            return {
                ...state,
                posts: state.posts.filter(post => post?._id !== action.payload)
            }
        default: 
            return state
    }
}