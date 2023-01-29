import { END_C_LOADING, START_C_LOADING } from "../actions/actionTypes";

export default function reducer(cLoading = false, action) {
  switch (action.type) {
    case START_C_LOADING:
      return true;
    case END_C_LOADING:
      return false;
    default:
      return cLoading;
  }
}
