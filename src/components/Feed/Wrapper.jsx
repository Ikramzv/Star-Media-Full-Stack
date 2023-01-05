import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdditionalPostsToShow,
  getTimelinePosts,
} from "../../actions/postAction";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import NotFound from "./NotFound";

let initialLoadScroll = true;

function figureOutSince(shownPosts, posts, since) {
  if (shownPosts === "mainPosts") {
    return posts.at(-1)?.createdAt;
  }
  if (since.current === null && shownPosts === "additionalPosts") {
    return new Date().toISOString();
  } else if (shownPosts === "additionalPosts") {
    return posts.at(-1)?.createdAt;
  }
}

function Wrapper({ isProfile, posts, children }) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const [shownPosts, setShownPosts] = useState("mainPosts");
  const [scrollY, setScrollY] = useState(0);
  const [incomingData, setIncomingData] = useState({
    mainPosts: posts.length > 0 ? [null] : [],
    additionalPosts: [null],
  });

  const debouncedScrollY = useDebounce(scrollY, 75);
  let since = useRef(null);

  const fetchPosts = () => {
    since.current = figureOutSince(shownPosts, posts, since);
    const container = wrapperRef.current;
    const limit = window.innerHeight + window.scrollY + 275;
    if (limit > container?.offsetHeight) {
      if (incomingData[shownPosts].length && !loading) {
        if (shownPosts === "mainPosts") {
          dispatch(getTimelinePosts(since.current, setIncomingData));
        } else {
          dispatch(getAdditionalPostsToShow(since.current, setIncomingData));
        }
      }
    }
  };

  useEffect(() => {
    if (shownPosts === "additionalPosts") {
      since.current = null;
      fetchPosts();
    }
  }, [shownPosts]);

  useUpdateEffect(() => {
    if (!initialLoadScroll) {
      fetchPosts();
    }
    return () => {
      initialLoadScroll = false;
    };
  }, [debouncedScrollY]);

  useEffect(() => {
    const handleOnScroll = (e) => {
      setScrollY(window.scrollY);
    };
    if (!isProfile.isProfilePage) {
      window.addEventListener("scroll", handleOnScroll);
    } else {
      window.removeEventListener("scroll", handleOnScroll);
    }
  }, [isProfile.isProfilePage]);

  useEffect(() => {
    if (!isProfile.isProfilePage) {
      if (posts.length) since.current = posts.at(-1)?.createdAt;
      dispatch(getTimelinePosts(since.current ? since.current : undefined));
    }
  }, []);

  return (
    <div ref={wrapperRef} className="feedWrapper">
      {children}
      {!loading ? (
        <NotFound
          incomingData={incomingData}
          setShownPosts={setShownPosts}
          shownPosts={shownPosts}
          profileUser={isProfile.profileUser}
        />
      ) : null}
    </div>
  );
}

export default Wrapper;
