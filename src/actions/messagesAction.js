import {
  getMessagesApi,
  sendMessageApi,
  setConversationMessageRead,
} from "../api";
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  SET_UNREAD_MESSAGES,
  SET_UNREAD_MESSAGES_READ,
} from "./actionTypes";

export const getMessages = (convId) => async (dispatch) => {
  try {
    const { data } = await getMessagesApi(convId);
    dispatch({
      type: GET_MESSAGES,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error);
  }
};

export const setMessagesUnread = (messages) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UNREAD_MESSAGES,
      payload: messages,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setUnreadMessagesRead = (convId) => async (dispatch) => {
  try {
    dispatch({
      type: SET_UNREAD_MESSAGES_READ,
      payload: convId,
    });
    await setConversationMessageRead(convId);
  } catch (error) {
    Promise.reject(error);
  }
};

export const sendMessageAction =
  (message, socket_message) => async (dispatch) => {
    try {
      dispatch({
        type: SEND_MESSAGE,
        payload: message,
      });

      if (socket_message) return;

      const { createdAt, sender, receiver, ...body } = message;

      await sendMessageApi({ ...body, read: true });
    } catch (error) {}
  };
