import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FETCH_FROM_CACHE,
  GET_COMMENTS,
  LIKE_COMMENT,
} from "../actions/actionTypes";

const initialState = {
  comments: [],
  cachedComments: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      const comments = action.complete
        ? action.payload
        : [...state.comments, ...action.payload];
      const since = action.since ? action.since.split("-").join(".") : "";
      const rest = action.payload.length
        ? {
            cachedComments: {
              ...state.cachedComments,
              [`${action.payload[0].postId},${since}`]: comments,
            },
          }
        : { cachedComments: state.cachedComments };

      return {
        ...rest,
        comments,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case FETCH_FROM_CACHE:
      return {
        ...state,
        comments: state.cachedComments[action.key],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment?._id !== action.commentId
        ),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((c) => {
          if (c?._id === action.commentId) {
            return {
              ...c,
              comment: action.comment,
            };
          }
          return c;
        }),
      };
    case LIKE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment?._id === action.commentId) {
            return {
              ...comment,
              likes: comment.likes.some((uid) => uid === action.userId)
                ? comment.likes.filter((uid) => uid !== action.userId)
                : [...comment.likes, action.userId],
            };
          }
          return comment;
        }),
      };
    default:
      return state;
  }
};
