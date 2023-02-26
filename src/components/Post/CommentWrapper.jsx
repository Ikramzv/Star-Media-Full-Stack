import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { injectEndpoints } from "../../api";
import withStore from "../../hocs/withStore";
import useDebounce from "../../hooks/useDebounce";
import { setCommentLoading, setComments } from "../../slices/commentReducer";
import store from "../../store";
import { isCached } from "../../utils";

function CommentWrapper({
  children,
  isModalOpen,
  postId,
  firstLoading,
  state,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useDispatch();
  const boxRef = useRef();
  const {
    comments: { comments },
    loading,
  } = useMemo(() => state, Object.values(state));

  const since = useRef(null);

  const { useLazyLoadCommentsQuery } = useMemo(() => {
    return injectEndpoints({
      overrideExisting: true,
      endpoints: (builder) => ({
        loadComments: builder.query({
          query: ({ since, postId }) => {
            return `/comments/comment/${postId}${
              since ? `?since=${since}` : ""
            }`;
          },
          transformResponse(result) {
            const data = result.map((r) => ({
              ...r,
              cacheKey: {
                endpoint: "loadComments", // afterwards we can update a specific part of the cache based on cacheKey property
                since: since.current,
              },
            }));
            // If user requests for that post's comments first time ,
            // then we have to set all incoming post from the first request to the state
            firstLoading.current = false;
            dispatch(
              setComments({
                data,
                isFirstRequest: since.current === null,
              })
            );
            since.current = result.at(-1)?.createdAt;
            return data;
          },
          keepUnusedDataFor: 3600,
          onQueryStarted() {
            dispatch(setCommentLoading());
          },
        }),
      }),
    });
  }, []);

  const [loadComments] = useLazyLoadCommentsQuery();
  const deferredScrollTop = useDebounce(scrollTop, 200);

  const fetchFromCache = (args) => {
    const cached = isCached(store, "loadComments", args);
    if (!!cached) {
      firstLoading.current = false;
      since.current = cached.at(-1)?.createdAt;
      if (!cached.length) return true;
      dispatch(
        setComments({
          data: cached,
          isFirstRequest: args.since === null,
        })
      );
      return true;
    } else return false;
  };

  const fetchMoreComment = () => {
    const actualHeight =
      boxRef.current.scrollHeight - boxRef.current.clientHeight;
    const limit = 600;
    if (!comments.length) return;
    if (scrollTop + limit > actualHeight && !loading) {
      since.current = comments.at(-1)?.createdAt;
      const isCached = fetchFromCache({ postId, since: since.current });
      if (isCached) return;

      loadComments({ since: since.current, postId }, true);
    }
  };

  const handleScroll = (e) => {
    setScrollTop(boxRef.current.scrollTop);
  };

  useEffect(() => {
    if (isModalOpen) {
      if (since.current === null) {
        const isCached = fetchFromCache({ postId, since: null });
        if (isCached) return;

        firstLoading.current = true;
        loadComments({ since: since.current, postId }, true);
      } else fetchMoreComment();
    } else {
      since.current = null;
    }
  }, [isModalOpen, deferredScrollTop]);

  return (
    <Box
      height={matches ? "65vh" : "76vh"}
      className="modal_grid_left_box"
      display="flex"
      flexDirection={"column"}
      gap={"15px"}
      sx={{
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        padding: "0 5px 60px 0",
      }}
      ref={boxRef}
      onScroll={handleScroll}
    >
      {children}
    </Box>
  );
}

export default withStore(CommentWrapper, ["comments", "loading"]);
