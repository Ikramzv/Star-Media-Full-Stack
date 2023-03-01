import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import withStore from "../../hocs/withStore";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import NotFound from "./NotFound";

let fetchFromNow = true;

function figureOutSince(postType, posts, since) {
  if (postType === "mainPosts") {
    return posts.at(-1)?.createdAt;
  }
  if (
    since.current === null &&
    postType === "additionalPosts" &&
    fetchFromNow
  ) {
    fetchFromNow = false;
    return new Date().toISOString();
  } else if (postType === "additionalPosts") {
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
  const { id: profileId } = useParams();
  const loading = useMemo(() => state.loading, [state.loading]);
  const [postType, setPostType] = useState(profileId ? "mainPosts" : pageState);
  const [scrollY, setScrollY] = useState(0);
  const [incomingData, setIncomingData] = useState({
    mainPosts: profileId || pageState !== "additionalPosts" ? new Array(5) : [],
    additionalPosts: new Array(5),
  });

  const debouncedScrollY = useDebounce(scrollY, 250);

  useEffect(() => {
    if (profileId) return;
    if (postType === "additionalPosts") pageState = "additionalPosts";
  }, [profileId, postType]);

  const since = useRef(null);

  const fetchPosts = async (profileId, initialRequest) => {
    since.current = figureOutSince(postType, posts, since);
    if (initialRequest && posts.length === 0) since.current = null; // If it is initialRequest , then set since.current = null
    if (typeof since.current === "undefined") return;

    const container = wrapperRef.current;
    const limit = window.innerHeight + window.scrollY + 1200;

    // if loading is true , then don't send additional request
    if ((limit < container?.offsetHeight || loading) && !initialRequest) return; // check scroll limit
    if (incomingData[postType].length < 5 && !initialRequest) return;

    let items = [];
    if (profileId) {
      const data = await loadPosts({
        since: since.current,
        profileId,
      }).unwrap(); // fetch profile posts
      items = data;
    } else {
      if (postType === "mainPosts") {
        const data = await loadPosts({ since: since.current }, true).unwrap(); // fetch timeline posts
        items = data;
      } else {
        const data = await loadAdditionalPosts(since.current, true).unwrap(); // fetch others' posts
        items = data;
      }
    }

    // incomingData for awaring of how many posts fetched from db
    // If the number of posts fetched is less than 5 , then it is time to see others' posts
    setIncomingData((prev) => ({ ...prev, [postType]: items })); // Updates how many posts fetched
  };

  useEffect(() => {
    const initialRequst = true;
    fetchPosts(profileId || null, initialRequst);
  }, [profileId]);

  useUpdateEffect(() => {
    // fetch others' posts which is sorted by createdAt from current time
    if (postType === "additionalPosts") since.current = null;
    fetchPosts(profileId || null);
  }, [debouncedScrollY, postType]);

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
          setPostType={setPostType}
          postType={postType}
          profileUser={profileUser}
          posts={posts}
        />
      ) : null}
    </div>
  );
}

export default withStore(Wrapper, ["loading"]);
