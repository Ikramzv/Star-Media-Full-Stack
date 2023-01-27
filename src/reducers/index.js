import { combineReducers } from "redux";
import comments from "./commentReducer";
import conversation from "./conversationReducer";
import loading from "./loadingReducer";
import messages from "./messagesReducer";
import posts from "./postReducer";
import user from "./userReducer";

export default combineReducers({
  posts,
  user,
  loading,
  conversation,
  messages,
  comments,
});
