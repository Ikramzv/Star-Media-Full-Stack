import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  likeComment,
} from "../api";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  END_C_LOADING,
  GET_COMMENTS,
  LIKE_COMMENT,
  START_C_LOADING,
} from "./actionTypes";

export const getCommentsAction =
  (postId, since, complete, firstLoading) => async (dispatch) => {
    dispatch({
      type: START_C_LOADING,
    });
    try {
      const { data } = await getComments(postId, since);
      if (firstLoading) firstLoading.current = false;
      dispatch({
        type: GET_COMMENTS,
        payload: data,
        complete,
        since,
      });
    } catch (error) {
      Promise.reject(error);
    }
    dispatch({
      type: END_C_LOADING,
    });
  };

export const createCommentAction = (commentData) => async (dispatch) => {
  dispatch({
    type: START_C_LOADING,
  });
  try {
    const { data } = await createComment(commentData);
    dispatch({
      type: CREATE_COMMENT,
      payload: data,
    });
  } catch (error) {
    Promise.reject();
  }
  dispatch({
    type: END_C_LOADING,
  });
};

export const deleteCommentAction = (commentId, postId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_COMMENT,
      commentId,
      postId,
    });
    await deleteComment(commentId);
  } catch (error) {
    Promise.reject(error);
  }
};

export const editCommentAction =
  (commentId, comment, postId) => async (dispatch) => {
    try {
      dispatch({
        type: EDIT_COMMENT,
        commentId,
        comment,
        postId,
      });
      await editComment(commentId, comment);
    } catch (error) {
      Promise.reject(error);
    }
  };

export const likeCommentAction =
  (commentId, userId, postId) => async (dispatch) => {
    try {
      dispatch({
        type: LIKE_COMMENT,
        commentId,
        userId,
        postId,
      });
      await likeComment(commentId);
    } catch (error) {
      Promise.reject(error);
    }
  };
