import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
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
