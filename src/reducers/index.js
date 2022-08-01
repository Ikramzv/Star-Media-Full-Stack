import { combineReducers } from "redux";
import posts from './postReducer'
import user from './userReducer'
import loading from './loadingReducer'
import conversation from './conversationReducer'
import messages from './messagesReducer'

export default combineReducers({
    posts,
    user,
    loading,
    conversation,
    messages
})