import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  initialState: null,
  name: "user",
  reducers: {
    setUser: (state, action) => action.payload,
    logOut: () => null,
  },
});

export const { reducer } = userSlice;
export const { logOut, setUser } = userSlice.actions;
