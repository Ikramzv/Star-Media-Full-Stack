import { createSlice } from "@reduxjs/toolkit";
import { END_LOADING, START_LOADING } from "../actions/actionTypes";

const loadingSlice = createSlice({
  initialState: false,
  name: "loading",
  reducers: {
    setLoading: (state, action) => action.payload,
  },
});

export const { reducer } = loadingSlice;
export const { setLoading } = loadingSlice.actions;

export default (loading = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return (loading = true);
    case END_LOADING:
      return (loading = false);
    default:
      return loading;
  }
};
