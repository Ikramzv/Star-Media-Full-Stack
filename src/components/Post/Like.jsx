import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useMemo } from "react";

const Like = ({ item, user, like, args }) => {
  const likePost = () => {
    like(args);
  };
  const liked = useMemo(
    () => item.likes.some((id) => id === user?._id),
    [item.likes.length]
  );
  return (
    <button className="postActions postLikeAction" onClick={likePost}>
      <span className="postActionsText">Like</span>
      {liked ? (
        <Favorite className="likeBtn" color="error" />
      ) : (
        <FavoriteBorder className="likeBtn" />
      )}
      <span className="likeCounter">{item.likes.length}</span>
    </button>
  );
};

export default Like;
