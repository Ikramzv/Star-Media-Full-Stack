import { Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { injectEndpoints, updateQueryData } from "../../api";
import { addComment } from "../../slices/commentReducer";
import { updateRecipe } from "../../utils";

function CommentForm({ user, postId }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const { useCreateCommentMutation } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        createComment: builder.mutation({
          query: ({ comment, postId, _id }) => ({
            url: `/comments`,
            body: { comment, postId, _id },
            method: "POST",
          }),
          onQueryStarted(comment, {}) {
            const { postId } = comment;
            dispatch(addComment(comment));
            dispatch(
              updateQueryData(
                "loadComments",
                { since: null, postId },
                (comments) => [comment, ...comments]
              )
            );
            dispatch(
              updateQueryData("posts", { since: null }, (posts) => {
                return updateRecipe(
                  posts,
                  { itemId: postId },
                  "commentsCount",
                  (commentsCount) => ({ count: commentsCount.count + 1 })
                );
              })
            );
          },
        }),
      }),
    });
  }, [postId]);

  const [createComment] = useCreateCommentMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: crypto.randomUUID(),
      likes: [],
      createdAt: new Date().toISOString(),
      comment: value,
      postId,
      userId: user?._id,
      user: {
        username: user?.username,
        userProfileImage: user?.userProfileImage,
      },
      cacheKey: {
        endpoint: "loadComments",
        since: null,
      },
    };
    createComment(data);
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
        placeholder={`${user?.username} start a comment ...`}
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

export default React.memo(CommentForm);
