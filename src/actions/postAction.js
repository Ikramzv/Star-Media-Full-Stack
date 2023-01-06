import {
  createPost,
  deletePostApi,
  getAdditionalPostsToShowApi,
  getTimeline,
  getUserAllPost,
  likePost,
  updatePostApi,
} from "../api";
import {
  CREATE_POST,
  DELETE_POST,
  END_LOADING,
  LIKE_POST,
  SET_ADDITIONAL_POSTS_TO_SHOW,
  SET_PROFILE_POSTS,
  SET_TIMELINE_POSTS,
  START_LOADING,
  UPDATE_POST,
} from "./actionTypes";
export const getTimelinePosts =
  (since, setData, complete) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await getTimeline(since);
      if (setData) setData((prev) => ({ ...prev, mainPosts: data }));
      if (data.length) {
        dispatch({
          type: SET_TIMELINE_POSTS,
          payload: data,
          complete,
        });
      }
    } catch (error) {
      Promise.reject(error.response.data);
    }
    dispatch({ type: END_LOADING });
  };

export const getProfilePostsAction = (userId) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await getUserAllPost(userId);
    dispatch({
      type: SET_PROFILE_POSTS,
      payload: data,
    });
  } catch (error) {
    Promise.reject(error.response.data);
  }
  dispatch({ type: END_LOADING });
};

export const updatePostAction = (postId, desc) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POST,
      postId,
      postDescription: desc,
    });
    await updatePostApi(postId, desc);
  } catch (error) {
    Promise.reject(error.response.data);
  }
};

export const getAdditionalPostsToShow =
  (since, setData) => async (dispatch) => {
    dispatch({ type: START_LOADING });
    try {
      const { data } = await getAdditionalPostsToShowApi(since);
      if (setData) setData((prev) => ({ ...prev, additionalPosts: data }));
      if (data.length) {
        dispatch({
          type: SET_ADDITIONAL_POSTS_TO_SHOW,
          payload: data,
        });
      }
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

export const createUserPost = (payload, user) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await createPost(payload);
    dispatch({
      type: CREATE_POST,
      payload: {
        ...data,
        user,
      },
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
