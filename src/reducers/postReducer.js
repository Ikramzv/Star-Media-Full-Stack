import {
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_ADDITIONAL_POSTS_TO_SHOW,
  SET_TIMELINE_POSTS,
} from "../actions/actionTypes";

export default (state = { posts: [], postUsers: [] }, action) => {
  switch (action.type) {
    case SET_TIMELINE_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_ADDITIONAL_POSTS_TO_SHOW:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.postId) {
            return {
              ...post,
              likes: post.likes.some((id) => id === action.userId)
                ? post.likes.filter((id) => id !== action.userId)
                : [...post.likes, action.userId],
            };
          }
          return post;
        }),
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post?._id !== action.payload),
      };
    default:
      return state;
  }
};
