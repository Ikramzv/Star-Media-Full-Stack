import axios from "axios";
import SERVER_URL from "../constants";

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
export const getUserAllPost = async (id) =>
  await API.get(`/users/profile/${id}`);
export const getFollowings = async (id) =>
  await API.get(`/users/followings/${id}`);
export const followUserApi = async (id) => await API.put(`/users/${id}/follow`);
export const unfollowUserApi = async (id) =>
  await API.put(`/users/${id}/unfollow`);

// POSTS

export const getTimeline = async () => await API.get(`/posts/timeline/all`);

export const likePost = async (id) => await API.put(`/posts/${id}/like`);
export const createPost = async (payload) => await API.post("/posts", payload);
export const deletePostApi = async (id) => await API.delete(`/posts/${id}`);

// Conversations and messages

export const getConversation = async () => await API.get(`/conversations`); // This will come based on current signed in user
export const createConversation = async (receiverId) =>
  await API.post(`/conversations/${receiverId}`);
export const getSingleConversation = async (conversationId) =>
  await API.get(`/conversations/${conversationId}`);

export const getMessagesApi = async (convId) =>
  await API.get(`/messages/${convId}`);
export const getAllMessages = async () => await API.get("/messages");
export const sendMessageApi = async (data) => await API.post("/messages", data);
export const setMessageRead = async (messageId) =>
  await API.patch(`/messages/${messageId}`);
export const setConversationMessageRead = async (conversationId) =>
  await API.patch(`/messages/conversationMessageRead/${conversationId}`);
