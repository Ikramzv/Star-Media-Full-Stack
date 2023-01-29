import { Comment as CommentIcon } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { SET_MODAL } from "../../actions/actionTypes";
import "./comment.css";

function Comment({ post }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: SET_MODAL,
      postId: post?._id,
    });
  };

  return (
    <>
      <div className="postBottomLeftActions" onClick={handleClick}>
        <CommentIcon color="primary" />
        <span>{post?.commentsCount?.count}</span>
      </div>
    </>
  );
}

export default React.memo(Comment);
