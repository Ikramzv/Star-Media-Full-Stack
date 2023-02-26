import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  initialState: [],
  name: "conversations",
  reducers: {
    setConversations: (s, action) => action.payload,
    addConversation: (state, action) => [action.payload, ...state],
  },
});

export const { setConversations, addConversation } = conversationSlice.actions;
export const { reducer } = conversationSlice;
