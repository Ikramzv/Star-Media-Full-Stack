import { createConversation, getConversation } from "../api";
import {
  CREATE_CONVERSATION,
  END_LOADING,
  GET_CONVERSATION,
  START_LOADING,
} from "./actionTypes";

export const getConvs = () => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await getConversation();
    dispatch({
      type: GET_CONVERSATION,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error);
  }
  dispatch({ type: END_LOADING });
};

export const createConversationAction =
  (receiverId, setCurrentChat, setConversations, conversations) =>
  async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await createConversation(receiverId);
      dispatch({
        type: CREATE_CONVERSATION,
        payload: data,
      });
      setConversations([
        ...conversations,
        {
          _id: data?._id,
          members: data?.members,
        },
      ]);
      setCurrentChat(data);
    } catch (error) {
      Promise.reject(error);
    }
    dispatch({ type: END_LOADING });
  };
