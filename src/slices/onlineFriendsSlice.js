import { createSlice } from "@reduxjs/toolkit";

const onlineFriendsSlice = createSlice({
  initialState: [],
  name: "ofriends",
  reducers: {
    setOnlineFriends: (state, action) => action.payload,
  },
});

export const { reducer } = onlineFriendsSlice;
export const { setOnlineFriends } = onlineFriendsSlice.actions;
