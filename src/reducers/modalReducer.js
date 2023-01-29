import { ON_CLOSE, SET_MODAL } from "../actions/actionTypes";

const initialState = {
  open: false,
  postId: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        postId: action.postId,
        open: true,
      };
    case ON_CLOSE:
      return {
        ...state,
        postId: "",
        open: false,
      };
    default:
      return state;
  }
}
