import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdditionalPostsToShow,
  getProfilePostsAction,
  getTimelinePosts,
} from "../../actions/postAction";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import NotFound from "./NotFound";

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
    mainPosts: new Array(5),
    additionalPosts: new Array(5),
  });

  const debouncedScrollY = useDebounce(scrollY, 250);

  let since = useRef(null);

  const fetchPosts = ({ isProfilePage, profileUser }) => {
    since.current = figureOutSince(shownPosts, posts, since);
    const container = wrapperRef.current;
    const limit = window.innerHeight + window.scrollY + 1200;
    if (limit > container?.offsetHeight) {
      if (incomingData[shownPosts].length >= 5 && !loading) {
        if (isProfilePage) {
          dispatch(
            getProfilePostsAction(
              profileUser._id,
              since.current,
              setIncomingData
            )
          );
        } else {
          if (shownPosts === "mainPosts") {
            dispatch(getTimelinePosts(since.current, setIncomingData));
          } else {
            dispatch(getAdditionalPostsToShow(since.current, setIncomingData));
          }
        }
      }
    }
  };

  useEffect(() => {
    if (shownPosts === "additionalPosts") {
      since.current = null;
      fetchPosts({});
    }
  }, [shownPosts]);

  useUpdateEffect(() => {
    if (isProfile.isProfilePage) fetchPosts(isProfile);
    else fetchPosts({});
  }, [debouncedScrollY, isProfile.profileUser?._id]);

  useEffect(() => {
    const handleOnScroll = (e) => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      // when home page have been visited from another route such as /profile ,
      // I am saying that fetch home page posts remove profile posts from state by signing completePosts = "complete"
      let completePosts;
      if (posts.length) {
        completePosts = "complete";
        since.current = new Date().toISOString();
      }
      const sinc = since.current ? since.current : undefined;
      if (isProfile.isProfilePage) {
        dispatch(
          getProfilePostsAction(
            isProfile.profileUser._id,
            since.current,
            setIncomingData,
            completePosts
          )
        );
      } else {
        dispatch(getTimelinePosts(sinc, setIncomingData, completePosts));
      }
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
