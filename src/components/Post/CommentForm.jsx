import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { INCREMENT_COMMENT_COUNTS } from "../../actions/actionTypes";
import { createCommentAction } from "../../actions/commentAction";

function CommentForm({ user, postId }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      likes: [],
      createdAt: new Date().toISOString(),
      comment: value,
      postId: postId,
      user: {
        username: user?.username,
        userProfileImage: user?.userProfileImage,
        _id: user?._id,
      },
    };
    dispatch(createCommentAction(data));
    dispatch({
      type: INCREMENT_COMMENT_COUNTS,
      postId: postId,
    });
    setValue("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", gap: "3px" }}
    >
      <textarea
        value={value}
        onChange={handleChange}
        className="comment_input"
        placeholder="Start a comment"
      />
      <Button
        disabled={!Boolean(value)}
        type="submit"
        variant="outlined"
        color="primary"
        sx={{ fontSize: "13px" }}
      >
        comment
      </Button>
    </form>
  );
}

export default CommentForm;
