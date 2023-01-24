import { getUser, login, register } from "../api";
import { END_LOADING, LOGOUT, SET_USER, START_LOADING } from "./actionTypes";

export const loginUser = (loginData, navigate) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await login(loginData);
    dispatch({
      type: SET_USER,
      payload: data,
    });
    navigate("/home");
  } catch (error) {
    alert(error.response.data);
  }
  dispatch({ type: END_LOADING });
};

export const getUserAction = (userId, setUser) => async (dispatch) => {
  dispatch({
    type: START_LOADING,
  });
  try {
    const { data } = await getUser(userId);
    setUser(data);
  } catch (error) {
    Promise.reject(error);
  }
  dispatch({
    type: END_LOADING,
  });
};

export const registerUser =
  (registerationData, navigate) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await register(registerationData);
      dispatch({
        type: SET_USER,
        payload: data,
      });
      navigate("/home");
    } catch (error) {
      Promise.reject(error.response.data);
    }
    dispatch({ type: END_LOADING });
  };

export const logOutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
