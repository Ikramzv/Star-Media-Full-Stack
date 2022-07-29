import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  getSingleUser,
  like,
} from "../../actions/postAction";
import moment from "moment";
import "./Post.css";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const [likes, setLikes] = useState([]);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const postUsers = useSelector((state) => state.posts.postUsers);
  const [postUser, setPostUser] = useState({});
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const likePost = () => {
    if (!likes.find((id) => id === user?._id)) {
      setLikes([...likes, user?._id]);
    } else {
      setLikes(likes.filter((id) => id !== user?._id));
    }

    dispatch(like(post._id));
  };

  const deletePost = async () => {
    setDisabled(true);
    dispatch(deletePostAction(post?._id, setDisabled));
  };

  useEffect(() => {
    dispatch(getSingleUser(post.userId));
    setPostUser(postUsers.find((user) => user?._id === post?.userId));
    setLikes(post.likes);
  }, [post]);

  const Like = () => {
    return (
      <>
        {likes.some((id) => id === user?._id) ? (
          <Favorite className="likeBtn" onClick={likePost} color="error" />
        ) : (
          <FavoriteBorder className="likeBtn" onClick={likePost} />
        )}
        <span className="likeCounter">{likes.length}</span>
      </>
    );
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="topLeft">
            <img
              src={
                postUser?.userProfileImage
                  ? postUser?.userProfileImage
                  : "/user.webp"
              }
              alt=""
              className="postImg"
              onClick={() => navigate(`/profile/${postUser?._id}`)}
              style={{ cursor: "pointer" }}
            />
            <span className="postUsername">{postUser?.username}</span>
            <span className="postDate">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
          <div className="topRight">
            <MoreVert className="postTopRightSetting" />
            {post.userId === user?._id && (
              <button
                className="postDeleteBtn"
                onClick={deletePost}
                disabled={disabled}
              >
                Delete <Delete />
              </button>
            )}
          </div>
        </div>
        <figure className="postCenter">
          <figcaption className="postText">{post.desc}</figcaption>
          <img src={post.img} alt="" className="postCenterImg" />
        </figure>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Like />
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
