import { CREATE_CONVERSATION, GET_CONVERSATIONS } from "../actions/actionTypes";

export default (state = { conversations: [] }, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    default:
      return state;
  }
};
