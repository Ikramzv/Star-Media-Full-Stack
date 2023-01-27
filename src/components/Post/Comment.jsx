import { Comment as CommentIcon } from "@mui/icons-material";
import { CircularProgress, Grid, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_FROM_CACHE } from "../../actions/actionTypes";
import { getCommentsAction } from "../../actions/commentAction";
import "./comment.css";
import CommentForm from "./CommentForm";
import CommentWrapper from "./CommentWrapper";
import EachComment from "./EachComment";

function Comment({ post, user }) {
  const [open, setOpen] = useState(false);
  const {
    comments: { comments, cachedComments },
    loading,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      if (`${post?._id},` in cachedComments) {
        const map = Object.keys(cachedComments).filter((key) =>
          key.includes(`${post?._id},`)
        );
        dispatch({ type: FETCH_FROM_CACHE, key: map.at(-1) });
        console.log(cachedComments);
      } else {
        dispatch(getCommentsAction(post?._id, undefined, "complete"));
      }
    }
  }, [open]);
  return (
    <>
      <div className="postBottomLeftActions" onClick={handleClick}>
        <CommentIcon color="primary" />
        <span>{post.commentsCount.count}</span>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        sx={{
          width: "100vw",
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ bgcolor: "white", width: "75vw", height: "85vh" }}
          className="grid_container"
          borderRadius={"10px"}
          overflow="hidden"
          position={"relative"}
        >
          {loading && (
            <CircularProgress
              color="primary"
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "translate(-50%,-50%)",
                zIndex: "99999",
              }}
            />
          )}
          <Grid item xs={12} md={12} lg={8} p={2}>
            <CommentWrapper post={post}>
              {comments.length ? (
                comments.map((comment) => (
                  <EachComment
                    key={comment?._id}
                    comment={comment}
                    user={user}
                    post={post}
                  />
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {!loading && (
                    <p style={{ color: "gray", fontSize: "15px" }}>
                      There is no comments yet
                    </p>
                  )}
                </div>
              )}
            </CommentWrapper>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            p={2}
            boxShadow={"-0.5px 0 3px 0 black"}
          >
            <CommentForm user={user} post={post} />
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}

export default Comment;
