import { combineReducers } from "redux";
import cLoading from "./commentLoadingReducer";
import comments from "./commentReducer";
import conversation from "./conversationReducer";
import loading from "./loadingReducer";
import messages from "./messagesReducer";
import modal from "./modalReducer";
import posts from "./postReducer";
import user from "./userReducer";

export default combineReducers({
  posts,
  user,
  loading,
  conversation,
  messages,
  comments,
  modal,
  cLoading,
});
