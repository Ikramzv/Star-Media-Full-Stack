import { CircularProgress, Fade, Grid, Modal } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_FROM_CACHE, ON_CLOSE } from "../actions/actionTypes";
import { getCommentsAction } from "../actions/commentAction";
import CommentForm from "../components/Post/CommentForm";
import CommentWrapper from "../components/Post/CommentWrapper";
import EachComment from "../components/Post/EachComment";

function ModalComponent() {
  const {
    comments: { comments, cachedComments },
    cLoading,
    modal: { postId, open },
    user: { user },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const firstLoading = useRef(false);

  useEffect(() => {
    if (open) {
      if (`${postId},` in cachedComments) {
        const reg = new RegExp(postId, "i");
        const map = Object.keys(cachedComments).filter((key) => reg.test(key));
        dispatch({ type: FETCH_FROM_CACHE, key: map.at(-1) });
      } else {
        firstLoading.current = true;
        dispatch(
          getCommentsAction(postId, undefined, "complete", firstLoading)
        );
      }
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => dispatch({ type: ON_CLOSE })}
      keepMounted
      closeAfterTransition
      sx={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Fade in={open}>
        <Grid
          container
          spacing={2}
          sx={{ bgcolor: "white", width: "75vw", height: "85vh" }}
          className="grid_container"
          borderRadius={"10px"}
          overflow="hidden"
          position={"relative"}
        >
          {cLoading && (
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
            <CommentWrapper postId={postId}>
              {comments.length && !firstLoading.current ? (
                comments.map((comment) => (
                  <EachComment
                    key={comment?._id}
                    comment={comment}
                    user={user}
                    postId={postId}
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
                  {!cLoading && (
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
            <CommentForm user={user} postId={postId} />
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
}

export default ModalComponent;
