import EditIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints, updateQueryData } from "../../api";
import withStore from "../../hocs/withStore";
import {
  deleteComment,
  editComment,
  likeComment,
} from "../../slices/commentReducer";
import { setModalClose } from "../../slices/modalReducer";
import { deleteRecipe, updateRecipe, updateRecipeForLike } from "../../utils";
import Like from "./Like";

function EachComment({ comment, user, postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    useLikeCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
  } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        likeComment: builder.mutation({
          query: ({ commentId }) => ({
            url: `/comments/like/${commentId}`,
            method: "PATCH",
          }),
          onQueryStarted(arg, { dispatch }) {
            const { commentId: itemId, userId, ck, postId } = arg;
            dispatch(likeComment({ itemId, userId }));
            dispatch(
              updateQueryData(
                ck.endpoint,
                { since: ck.since, postId },
                (comments) => {
                  return updateRecipeForLike(comments, { itemId, userId });
                }
              )
            );
          },
        }),
        updateComment: builder.mutation({
          query: ({ comment, commentId }) => ({
            url: `/comments/${commentId}`,
            body: { comment },
            method: "PATCH",
          }),
          onQueryStarted(arg, { dispatch }) {
            const { ck, postId, commentId: itemId, comment: change } = arg;
            dispatch(editComment(arg));
            dispatch(
              updateQueryData(
                ck.endpoint,
                { since: ck.since, postId },
                (data) => {
                  return updateRecipe(data, { itemId, change }, "comment");
                }
              )
            );
          },
        }),
        deleteComment: builder.mutation({
          query: ({ commentId }) => ({
            url: `/comments/${commentId}`,
            method: "DELETE",
          }),
          onQueryStarted(arg, { dispatch }) {
            const { ck, postId } = arg;
            dispatch(deleteComment(arg)); // updates state
            dispatch(
              updateQueryData(
                // update cache
                ck.endpoint,
                { since: ck.since, postId },
                (data) => {
                  return deleteRecipe(data, arg.commentId);
                }
              )
            );
            dispatch(
              updateQueryData("posts", { since: null }, (posts) => {
                // update the commentsCount prop of post that updated comment belongs to
                return updateRecipe(
                  // util function
                  posts,
                  { itemId: postId },
                  "commentsCount",
                  (commentsCount) => ({ count: commentsCount.count - 1 })
                );
              })
            );
          },
        }),
      }),
    });
  }, [comment?._id]);
  const [likeCommentMutation] = useLikeCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteCommentMutation] = useDeleteCommentMutation();

  const navigateToProfile = () => {
    navigate(`/profile/${comment.userId}`);
    dispatch(setModalClose());
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    setOpen(false);
    const promp = prompt("", comment.comment);
    if (!promp || comment.comment === promp) return;
    const { _id: commentId, cacheKey: ck, postId } = comment;
    const args = { commentId, comment: promp, ck, postId };
    updateComment(args);
  };

  const handleDelete = () => {
    setOpen(false);
    const promp = prompt(
      "Are you sure to delete the comment? Write 'yes' to go on .."
    );
    if (!promp) return;
    if (promp !== "yes") return;
    const { _id: commentId, postId, cacheKey: ck } = comment;
    deleteCommentMutation({ commentId, postId, ck });
  };

  return (
    <Stack rowGap={1}>
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
          src={comment.user?.userProfileImage || "/user.webp"}
          onClick={navigateToProfile}
        />
        <Typography
          onClick={navigateToProfile}
          fontWeight={450}
          sx={{ textOverflow: "ellipsis" }}
        >
          {comment.user?.username}
          <span style={{ color: "gray", marginLeft: "8px", fontSize: "12px" }}>
            {moment(comment?.createdAt).fromNow()}
          </span>
        </Typography>
        {comment.userId === user?._id && (
          <div className="comment_actions_container">
            <button onClick={handleClick} className="comment_actions">
              <MoreHorizSharpIcon />
            </button>
            <div className={`comment_action_options ${open ? "open" : ""}`}>
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
        like={likeCommentMutation}
        args={{
          commentId: comment?._id,
          userId: user?._id,
          ck: comment?.cacheKey,
          postId,
        }}
      />
    </Stack>
  );
}

export default withStore(EachComment, []);
