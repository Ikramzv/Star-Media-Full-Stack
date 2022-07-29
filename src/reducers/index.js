import { combineReducers } from "redux";
import posts from './postReducer'
import user from './userReducer'
import loading from './loadingReducer'

export default combineReducers({
    posts,
    user,
    loading,
})