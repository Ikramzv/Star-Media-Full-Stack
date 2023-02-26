import { CircularProgress, Fade, Grid, Modal } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import CommentForm from "../components/Post/CommentForm";
import CommentWrapper from "../components/Post/CommentWrapper";
import EachComment from "../components/Post/EachComment";
import withStore from "../hocs/withStore";
import { setModalClose } from "../slices/modalReducer";

function ModalComponent({ state }) {
  const {
    comments: { comments, loading },
    modal: { postId, open },
    user,
  } = useMemo(() => state, Object.values(state));
  const dispatch = useDispatch();
  const firstLoading = useRef(false); // always get new object when page is remounted ( when navigated to another url )

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setModalClose())}
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
          {firstLoading.current || loading ? (
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
          ) : (
            ""
          )}
          <Grid item xs={12} md={12} lg={8} p={2}>
            <CommentWrapper
              firstLoading={firstLoading}
              postId={postId}
              isModalOpen={open}
            >
              {comments?.length && !firstLoading.current ? (
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
                  {!loading && !firstLoading.current && (
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

export default withStore(ModalComponent, ["comments", "modal", "user"]);
