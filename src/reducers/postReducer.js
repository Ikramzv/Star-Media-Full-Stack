import {
  CREATE_POST,
  DECREMENT_COMMENT_COUNTS,
  DELETE_POST,
  INCREMENT_COMMENT_COUNTS,
  LIKE_POST,
  SET_ADDITIONAL_POSTS_TO_SHOW,
  SET_PROFILE_POSTS,
  SET_TIMELINE_POSTS,
  UPDATE_POST,
} from "../actions/actionTypes";

export default (state = { posts: [] }, action) => {
  switch (action.type) {
    case SET_TIMELINE_POSTS:
      return {
        ...state,
        posts: action.complete
          ? action.payload
          : [...state.posts, ...action.payload],
      };
    case SET_ADDITIONAL_POSTS_TO_SHOW:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case SET_PROFILE_POSTS:
      return {
        ...state,
        posts: action.complete
          ? action.payload
          : [...state.posts, ...action.payload],
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
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.postId) {
            return {
              ...post,
              desc: action.postDescription,
            };
          }
          return post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post?._id !== action.payload),
      };
    case INCREMENT_COMMENT_COUNTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.postId
            ? {
                ...post,
                commentsCount: { count: post.commentsCount.count + 1 },
              }
            : post
        ),
      };
    case DECREMENT_COMMENT_COUNTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.postId
            ? {
                ...post,
                commentsCount: { count: post.commentsCount.count - 1 },
              }
            : post
        ),
      };
    default:
      return state;
  }
};
