import {
  GET_MESSAGES,
  SEND_MESSAGE,
  SET_UNREAD_MESSAGES,
  SET_UNREAD_MESSAGES_READ,
} from "../actions/actionTypes";

export default (state = { messages: [], unreadMessages: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case SET_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };
    case SET_UNREAD_MESSAGES_READ:
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter(
          (msg) => msg?.conversationId !== action.convId
        ),
      };
    default:
      return state;
  }
};
