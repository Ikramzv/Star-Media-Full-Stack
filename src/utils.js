import { updateQueryData } from "./api";

export const checkItemExists = (source, target) => {
  return source.some((item) => item === target);
};

export const serialize = (object) => JSON.stringify(object);

export const isCached = (store, endpoint, args) => {
  const serializedArg = serialize(args);
  const queryCacheKey = `${endpoint}(${serializedArg})`;
  return store.getState().api.queries[`${queryCacheKey}`]?.data;
};

export const updateRecipeForLike = (items, arg) => {
  const { itemId, userId } = arg;
  return items.map((item) => {
    if (item?._id === itemId) {
      item = {
        ...item,
        likes: checkItemExists(item.likes, userId)
          ? item.likes.filter((id) => id !== userId)
          : [...item.likes, userId],
      };
    }
    return item;
  });
};

export const updateRecipe = (items, arg, updateProp, cb) => {
  const { itemId, change } = arg;
  return items.map((item) => {
    if (item?._id === itemId) {
      item = {
        ...item,
        [updateProp]: cb ? cb(item[updateProp]) : change,
      };
    }
    return item;
  });
};

export const deleteRecipe = (items, removeValue) => {
  return items.filter((item) => item?._id !== removeValue);
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
  if (!args.profileId) {
    return [{ type: "Post", id: args.postId || "POST_LIST" }];
  } else return [];
};
