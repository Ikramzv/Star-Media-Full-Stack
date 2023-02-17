import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import SERVER_URL from "../constants";
import { setLoading } from "../reducers/loadingReducer";

function baseQuery() {
  return async (args, api, extraOptions) => {
    const headers = {};
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      headers["authorization"] = `Bearer ${user.accessToken}`;
    }
    const checkPost = /posts/i;
    if (api.endpoint.match(checkPost)) api.dispatch(setLoading(true));
    const result = await fetchBaseQuery({ baseUrl: SERVER_URL, headers })(
      args,
      api,
      extraOptions
    );
    if (api.endpoint.match(checkPost)) api.dispatch(setLoading(false));

    return result;
  };
}

export const api = createApi({
  baseQuery: baseQuery(),
  tagTypes: ["Post"],
  endpoints: (builder) => ({}),
});

export const { injectEndpoints, enhanceEndpoints } = api;
export const { updateQueryData } = api.util;

// transition to RTK

const API = axios.create({
  baseURL: SERVER_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    req.headers.authorization = `Bearer ${user.accessToken}`;
    return req;
  }

  return req;
});

// USER

export const login = async (payload) => await API.post("/auth/login", payload);
export const register = async (payload) =>
  await API.post("/auth/register", payload);
export const getUser = async (id) => await API.get(`/users/${id}`);
export const getUserWithQuery = async (username) =>
  await API.get(`/users?username=${username}`);
export const getUserAllPost = async (id, since) =>
  await API.get(`/users/profile/${id}?since=${since}`);
export const getFollowings = async (id) =>
  await API.get(`/users/followings/${id}`);
export const followUserApi = async (id) => await API.put(`/users/${id}/follow`);
export const unfollowUserApi = async (id) =>
  await API.put(`/users/${id}/unfollow`);

// POSTS

export const getTimeline = async (since) =>
  await API.get(`/posts/timeline/all${since ? `?since=${since}` : ""}`);
export const getAdditionalPostsToShowApi = async (since) =>
  await API.get(
    `/posts/timeline/additional_to_show${since ? `?since=${since}` : ""}`
  );

export const likePost = async (id) => await API.put(`/posts/${id}/like`);
export const createPost = async (payload) => await API.post("/posts", payload);
export const deletePostApi = async (id) => await API.delete(`/posts/${id}`);
export const updatePostApi = async (postId, desc) =>
  await API.patch(`/posts/edit/${postId}`, { desc });

// Comments

export const deleteComment = async (commentId) =>
  await API.delete(`/comments/${commentId}`);

export const editComment = async (commentId, comment) =>
  await API.patch(`/comments/${commentId}`, { comment });

export const createComment = async (data) => await API.post(`/comments`, data); // data = { comment, postId }

export const getComments = async (postId, since) =>
  await API.get(`/comments/comment/${postId}${since ? `?since=${since}` : ""}`);

export const likeComment = async (commentId) =>
  await API.patch(`/comments/like/${commentId}`);

// Conversations and messages

export const getConversation = async () => await API.get(`/conversations`); // This will come based on current signed in user
export const createConversation = async (receiverId) =>
  await API.post(`/conversations/${receiverId}`);
export const getSingleConversation = async (conversationId) =>
  await API.get(`/conversations/${conversationId}`);

export const getMessagesApi = async (convId) =>
  await API.get(`/messages/${convId}`);
export const getAllMessages = async () => await API.get("/messages");
export const getAllUnreadMessages = async () =>
  await API.get("/messages/unread");
export const sendMessageApi = async (data) => await API.post("/messages", data);
export const setMessageRead = async (messageId) =>
  await API.patch(`/messages/${messageId}`);
export const setConversationMessageRead = async (conversationId) =>
  await API.patch(`/messages/conversationMessageRead/${conversationId}`);
