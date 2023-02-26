import { createSlice } from "@reduxjs/toolkit";
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  SET_UNREAD_MESSAGES,
  SET_UNREAD_MESSAGES_READ,
} from "../actions/actionTypes";

const initialState = [];

const messagesSlice = createSlice({
  initialState,
  name: "messages",
  reducers: {
    setMessages: (s, action) => {
      return action.payload;
    },
    sendMessageAction: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { reducer } = messagesSlice;
export const { sendMessageAction, setMessages } = messagesSlice.actions;

export default (state = { messages: [], unreadMessages: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };
    case SET_UNREAD_MESSAGES_READ:
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter(
          (msg) => msg?.conversationId !== action.convId
        ),
      };
    default:
      return state;
  }
};
