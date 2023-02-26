import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT,
} from "../actions/actionTypes";
import { deleteRecipe, updateRecipe, updateRecipeForLike } from "../utils";

const initialState = {
  comments: [],
  loading: false,
};
const commentAdapter = createEntityAdapter({
  selectId: (comment) => comment?._id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

const commentSlice = createSlice({
  initialState,
  name: "comment",
  reducers: {
    setCommentLoading: (s, a) => ({ ...s, loading: true }),
    setComments: (state, action) => {
      const { data, isFirstRequest } = action.payload;
      return {
        ...state,
        loading: false,
        comments: isFirstRequest ? data : [...state.comments, ...data],
      };
    },
    createComment: (state, action) => {
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    },
    addComment: (state, action) => ({
      ...state,
      loading: false,
      comments: [action.payload, ...state.comments],
    }),
    likeComment: (state, action) => {
      const comments = updateRecipeForLike(state.comments, action.payload);
      return {
        ...state,
        comments,
      };
    },
    editComment: (state, action) => {
      const { commentId: itemId, comment: change } = action.payload;
      const comments = updateRecipe(
        state.comments,
        { itemId, change },
        "comment"
      );
      return {
        ...state,
        comments,
      };
    },
    deleteComment: (state, action) => {
      const comments = deleteRecipe(state.comments, action.payload.commentId);
      return {
        ...state,
        comments,
      };
    },
  },
});

export const { reducer } = commentSlice;
export const {
  setComments,
  createComment,
  likeComment,
  setCommentLoading,
  deleteComment,
  editComment,
  addComment,
} = commentSlice.actions;

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
