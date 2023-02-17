import { updateQueryData } from "./api";

export const checkItemExists = (source, target) => {
  return source.some((item) => item === target);
};

export const updateRecipeForLike = (posts, arg) => {
  const { postId, userId } = arg;
  return posts.map((post) => {
    if (post?._id === postId) {
      post = {
        ...post,
        likes: checkItemExists(post.likes, userId)
          ? post.likes.filter((id) => id !== userId)
          : [...post.likes, userId],
      };
    }
    return post;
  });
};

export const bothHomeProfileForTheCache = ({
  dispatch,
  args,
  action,
  endpoint,
}) => {
  dispatch(
    updateQueryData(endpoint, { since: null }, (items) => action(items, args)) // Home page cache update
  );
  if (args.profileId) {
    // it means , user is on the profile page now
    dispatch(
      updateQueryData(
        endpoint,
        { since: null, profileId: args.profileId },
        (items) => action(items, args)
      )
    );
  }
};

export const invalidatePostTag = (args) => {
  console.log(args);
  if (!args.profileId) {
    return [{ type: "Post", id: args.postId || "POST_LIST" }];
  } else return [];
};
