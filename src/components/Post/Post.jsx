import {
  Delete,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePostAction, like } from "../../actions/postAction";
import { getUser } from "../../api";
import "./Post.css";

const Like = ({ post, user }) => {
  const dispatch = useDispatch();
  const likePost = () => {
    dispatch(like(post._id, user._id));
  };
  return (
    <>
      {post.likes.some((id) => id === user?._id) ? (
        <Favorite className="likeBtn" onClick={likePost} color="error" />
      ) : (
        <FavoriteBorder className="likeBtn" onClick={likePost} />
      )}
      <span className="likeCounter">{post.likes.length}</span>
    </>
  );
};

function Post({ post }) {
  const [postUser, setPostUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deletePost = async () => {
    setDisabled(true);
    const ask = prompt(
      "Are you sure to delete the post ? Then write 'yes' .. "
    );
    if (ask !== "yes") {
      setDisabled(false);
      return;
    } else {
      dispatch(deletePostAction(post?._id, setDisabled));
    }
  };

  useEffect(() => {
    getUser(post.userId).then(({ data }) => {
      setPostUser(data);
    });
  }, []);

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
            <Like post={post} user={user} />
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
