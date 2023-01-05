import { createConversation, getConversation } from "../api";
import {
  CREATE_CONVERSATION,
  END_LOADING,
  GET_CONVERSATIONS,
  START_LOADING,
} from "./actionTypes";

export const getConvs = () => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await getConversation();
    dispatch({
      type: GET_CONVERSATIONS,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error);
  }
  dispatch({ type: END_LOADING });
};

export const createConversationAction =
  (receiverId, navigate) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await createConversation(receiverId);
      dispatch({
        type: CREATE_CONVERSATION,
        payload: data,
      });
      navigate(`/messenger/${data?._id}`);
    } catch (error) {
      Promise.reject(error);
    }
    dispatch({ type: END_LOADING });
  };
