import { createSlice } from "@reduxjs/toolkit";

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
