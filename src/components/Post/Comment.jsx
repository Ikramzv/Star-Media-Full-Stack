import { Comment as CommentIcon } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../slices/modalReducer";
import "./comment.css";

function Comment({ post }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setModal({ postId: post?._id }));
  };

  return (
    <>
      <button className="postActions postCommentButton" onClick={handleClick}>
        <span className="postActionsText">Comment</span>
        <CommentIcon color="primary" />
        <span>{post?.commentsCount?.count}</span>
      </button>
    </>
  );
}

export default React.memo(Comment);
