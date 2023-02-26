import React, { useEffect, useMemo, useRef, useState } from "react";
import withStore from "../../hocs/withStore";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import NotFound from "./NotFound";

let fetchFromNow = true;

function figureOutSince(shownPosts, posts, since) {
  if (shownPosts === "mainPosts") {
    return posts.at(-1)?.createdAt;
  }
  if (
    since.current === null &&
    shownPosts === "additionalPosts" &&
    fetchFromNow
  ) {
    fetchFromNow = false;
    return new Date().toISOString();
  } else if (shownPosts === "additionalPosts") {
    return posts.at(-1)?.createdAt;
  }
}

let pageState = "mainPosts";

function Wrapper({
  profileUser,
  posts,
  children,
  loadPosts,
  loadAdditionalPosts,
  state,
}) {
  const wrapperRef = useRef(null);
  const profileId = useMemo(() => profileUser?._id, [profileUser]);
  const loading = useMemo(() => state.loading, [state.loading]);
  const [shownPosts, setShownPosts] = useState(
    profileId ? "mainPosts" : pageState
  );
  const [scrollY, setScrollY] = useState(0);
  const [incomingData, setIncomingData] = useState({
    mainPosts:
      profileId || pageState !== "additionalPosts" // If current user is on profile page or pageState hasn't been set to additionalPosts so far , it means that it still points to mainPosts otherwise additionalPosts must be fetched
        ? new Array(posts.length % 5 > 0 ? posts.length % 5 : 5) // If there were posts previosly , then set the incoming data to posts.length so that there won't more fetch as of now
        : [],
    additionalPosts: new Array(posts.length % 5 > 0 ? posts.length % 5 : 5),
  });
  const debouncedScrollY = useDebounce(scrollY, 250);
  useEffect(() => {
    if (profileId) return;
    if (shownPosts === "additionalPosts") pageState = "additionalPosts";
  }, [profileId, shownPosts]);

  const since = useRef(null);

  const fetchPosts = async (profileId) => {
    since.current = figureOutSince(shownPosts, posts, since);
    if (typeof since.current === "undefined") return;
    const container = wrapperRef.current;
    const limit = window.innerHeight + window.scrollY + 1200;
    if (limit > container?.offsetHeight) {
      if (incomingData[shownPosts].length >= 5 && !loading) {
        if (profileId) {
          const data = await loadPosts({
            since: since.current,
            profileId,
          }).unwrap();
          setIncomingData((prev) => ({ ...prev, mainPosts: data }));
        } else {
          if (shownPosts === "mainPosts") {
            const data = await loadPosts(
              { since: since.current },
              true
            ).unwrap();
            setIncomingData((prev) => ({ ...prev, mainPosts: data }));
          } else {
            const data = await loadAdditionalPosts(
              since.current,
              true
            ).unwrap();
            setIncomingData((prev) => ({ ...prev, additionalPosts: data }));
          }
        }
      }
    }
  };

  useEffect(() => {
    if (shownPosts === "additionalPosts") {
      since.current = null;
      fetchPosts(null);
    }
  }, [shownPosts]);

  useUpdateEffect(() => {
    if (profileId) fetchPosts(profileId);
    else fetchPosts(null);
  }, [debouncedScrollY, profileId]);

  useEffect(() => {
    const handleOnScroll = (e) => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleOnScroll);

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="feedWrapper">
      {children}
      {!loading ? (
        <NotFound
          incomingData={incomingData}
          setShownPosts={setShownPosts}
          shownPosts={shownPosts}
          profileUser={profileUser}
          posts={posts}
        />
      ) : null}
    </div>
  );
}

export default withStore(Wrapper, ["loading"]);
