import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsAction } from "../../actions/commentAction";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";

function CommentWrapper({ children, post }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  const [scrollTop, setScrollTop] = useState(0);
  const dispatch = useDispatch();
  const boxRef = useRef();
  const {
    comments: { comments },
    loading,
  } = useSelector((state) => state);

  const since = useRef();
  const deferredScrollTop = useDebounce(scrollTop, 200);

  const fetchMoreComment = () => {
    const actualHeight =
      boxRef.current.scrollHeight - boxRef.current.clientHeight;
    const limit = 600;
    if (!comments.length) return;
    if (scrollTop + limit > actualHeight && !loading) {
      since.current = comments.at(-1)?.createdAt;
      dispatch(getCommentsAction(post?._id, since.current));
    }
  };

  const handleScroll = (e) => {
    setScrollTop(boxRef.current.scrollTop);
  };

  useUpdateEffect(() => {
    if (loading) return;
    fetchMoreComment();
  }, [deferredScrollTop]);

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

export default CommentWrapper;
