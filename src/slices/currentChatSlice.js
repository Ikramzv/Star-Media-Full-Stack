import { createSlice } from "@reduxjs/toolkit";

const currentChatSlice = createSlice({
  initialState: null,
  name: "currentChat",
  reducers: {
    setCurrentChat: (s, action) => action.payload,
  },
});

export const { reducer } = currentChatSlice;
export const { setCurrentChat } = currentChatSlice.actions;
