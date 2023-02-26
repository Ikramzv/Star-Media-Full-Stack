import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/index";
import {
  commentsReducer,
  conversationReducer,
  currentChatReducer,
  loadingReducer,
  messagesReducer,
  modalReducer,
  onlineFriendsReducer,
  userReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    loading: loadingReducer,
    modal: modalReducer,
    comments: commentsReducer,
    currentChat: currentChatReducer,
    messages: messagesReducer,
    onlineFriends: onlineFriendsReducer,
    conversations: conversationReducer,
  },
  middleware: (gdm) => {
    return gdm().concat([api.middleware]);
  },
});

export default store;
