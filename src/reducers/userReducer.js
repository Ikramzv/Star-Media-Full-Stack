import { createSlice } from "@reduxjs/toolkit";
import { LOGOUT, SET_USER } from "../actions/actionTypes";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

const userSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("user")),
  name: "user",
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { reducer } = userSlice;
export const { logOut, setUser } = userSlice.actions;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
