import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  initialState: false,
  name: "loading",
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { reducer } = loadingSlice;
export const { setLoading } = loadingSlice.actions;
