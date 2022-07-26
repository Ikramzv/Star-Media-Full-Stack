import {
  FavoriteBorder,
  MoreVert,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import "./Post.css";

function Post({ post }) {
  const [like, setLike] = useState(post.like);
  return (
    <div className="post">
      {/* <div className="postWrapper">
        <div className="postTop">
          <div className="topLeft">
            <img src={user.img} alt="" className="postImg" />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">a few minutes ago</span>
          </div>
          <div className="topRight">
            <MoreVert />
          </div>
        </div>
        <figure className="postCenter">
          <figcaption className="postText">{post.desc}</figcaption>
          <img src={post.image} alt="" className="postCenterImg" />
        </figure>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpAltOutlined className="likeBtn" />
            <FavoriteBorder className="likeBtn" />
            <span className="likeCounter">32 people likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Post;
