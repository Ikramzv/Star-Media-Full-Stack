import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const Like = ({ item, user, action, args }) => {
  const dispatch = useDispatch();
  const likePost = () => {
    dispatch(action(...args));
  };
  return (
    <div className="postBottomLeftActions">
      {item.likes.some((id) => id === user?._id) ? (
        <Favorite className="likeBtn" onClick={likePost} color="error" />
      ) : (
        <FavoriteBorder className="likeBtn" onClick={likePost} />
      )}
      <span className="likeCounter">{item.likes.length}</span>
    </div>
  );
};

export default Like;
