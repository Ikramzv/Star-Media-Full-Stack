import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  postId: "",
};

const modalSlice = createSlice({
  initialState,
  name: "modal",
  reducers: {
    setModal: (state, action) => {
      return {
        ...state,
        postId: action.payload.postId,
        open: true,
      };
    },
    setModalClose: (state, a) => {
      return {
        ...state,
        open: false,
      };
    },
  },
});

export const { reducer } = modalSlice;
export const { setModal, setModalClose } = modalSlice.actions;
