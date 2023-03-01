import { createSlice } from "@reduxjs/toolkit";
import { deleteRecipe, updateRecipe } from "../utils";

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
    deleteMessageAction: (state, action) => {
      if (Array.isArray(action.payload)) return action.payload;

      return deleteRecipe(state, action.payload);
    },
    editMessageAction: (state, action) => {
      if (Array.isArray(action.payload)) return action.payload;
      const { msgId: itemId, msgText: change } = action.payload;

      return updateRecipe(state, { itemId, change }, "text");
    },
  },
});

export const { reducer } = messagesSlice;
export const {
  sendMessageAction,
  setMessages,
  deleteMessageAction,
  editMessageAction,
} = messagesSlice.actions;
