import { createSlice } from "@reduxjs/toolkit";
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
