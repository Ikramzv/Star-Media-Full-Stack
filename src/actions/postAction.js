import {
  createPost,
  deletePostApi,
  getAdditionalPostsToShowApi,
  getTimeline,
  likePost,
} from "../api";
import {
  CREATE_POST,
  DELETE_POST,
  END_LOADING,
  LIKE_POST,
  SET_ADDITIONAL_POSTS_TO_SHOW,
  SET_TIMELINE_POSTS,
  START_LOADING,
} from "./actionTypes";

export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await getTimeline();
    dispatch({
      type: SET_TIMELINE_POSTS,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error.response.data);
  }
  dispatch({ type: END_LOADING });
};

export const getAdditionalPostsToShow =
  (since, isCalled) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await getAdditionalPostsToShowApi(since);
      isCalled.called = true;
      console.log(data);
      dispatch({
        type: SET_ADDITIONAL_POSTS_TO_SHOW,
        payload: data,
      });
    } catch (error) {
      Promise.reject(error.response.data);
    }
    dispatch({ type: END_LOADING });
  };

export const like = (id, userId) => async (dispatch) => {
  try {
    dispatch({
      type: LIKE_POST,
      userId,
      postId: id,
    });
    await likePost(id);
  } catch (error) {
    Promise.reject(error);
  }
};

export const createUserPost = (payload) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await createPost(payload);
    dispatch({
      type: CREATE_POST,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error);
  }
  dispatch({ type: END_LOADING });
};

export const deletePostAction = (id, setDisabled) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    await deletePostApi(id);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    setDisabled(false);
  } catch (error) {
    Promise.reject(error);
  }
  dispatch({ type: END_LOADING });
};
