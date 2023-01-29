import EditIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DECREMENT_COMMENT_COUNTS } from "../../actions/actionTypes";
import {
  deleteCommentAction,
  editCommentAction,
  likeCommentAction,
} from "../../actions/commentAction";
import Like from "./Like";

function EachComment({ comment, user, postId }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const navigateToProfile = () => navigate(`/profile/${user?._id}`);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    setOpen(false);
    const promp = prompt("", comment.comment);
    if (!promp || comment.comment === promp) return;
    dispatch(editCommentAction(comment?._id, promp, postId));
  };

  const handleDelete = () => {
    setOpen(false);
    const promp = prompt(
      "Are you sure to delete the comment? Write 'yes' to go on .."
    );
    if (!promp) return;
    if (promp !== "yes") return;
    dispatch(deleteCommentAction(comment?._id, postId));
    dispatch({
      type: DECREMENT_COMMENT_COUNTS,
      postId: postId,
    });
  };

  return (
    <Stack>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        gap={"5px"}
        sx={{
          cursor: "pointer",
        }}
      >
        <img
          style={{
            borderRadius: "100%",
            width: "30px",
            height: "30px",
          }}
          src={user?.userProfileImage || "/user.webp"}
          onClick={navigateToProfile}
        />
        <Typography
          onClick={navigateToProfile}
          fontWeight={450}
          sx={{ textOverflow: "ellipsis" }}
        >
          {user?.username}
          <span style={{ color: "gray", marginLeft: "8px", fontSize: "12px" }}>
            {moment(comment?.createdAt).fromNow()}
          </span>
        </Typography>
        {comment.userId === user?._id && (
          <div className="comment_actions_container">
            <button onClick={handleClick} className="comment_actions">
              <MoreHorizSharpIcon />
            </button>
            <div className={`comment_action_options ${open && "open"}`}>
              <button onClick={handleDelete}>
                <DeleteOutlineIcon />
              </button>
              <button onClick={handleEdit}>
                <EditIcon />
              </button>
            </div>
          </div>
        )}
      </Stack>
      <Typography
        variant="body1"
        sx={{ wordBreak: "break-word", wordWrap: "break-word" }}
      >
        {comment.comment}
      </Typography>
      <Like
        item={comment}
        user={user}
        action={likeCommentAction}
        args={[comment?._id, user?._id, postId]}
      />
    </Stack>
  );
}

export default EachComment;
