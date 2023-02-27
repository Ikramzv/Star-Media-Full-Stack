import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const profileId = useMemo(() => profileUser?._id, [profileUser]);
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

  useEffect(() => {
    const data = new Array(posts.length % 5 > 0 || posts.length === 0 ? 0 : 5);
    setIncomingData((prev) => ({ ...prev, [postType]: data }));
  }, [posts.length]);

  const since = useRef(null);

  const fetchPosts = async (profileId) => {
    since.current = figureOutSince(postType, posts, since);
    if (typeof since.current === "undefined") return;

    const container = wrapperRef.current;
    const limit = window.innerHeight + window.scrollY + 1200;

    if (limit < container?.offsetHeight) return; // check scroll limit
    if (incomingData[postType].length < 5 || loading) return; // if loading is true , then don't send additional request
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

    if (items.length === 0)
      setIncomingData((prev) => ({ ...prev, [postType]: items }));
  };

  useUpdateEffect(() => {
    // fetch others' posts which is sorted by createdAt from current time
    if (postType === "additionalPosts") since.current = null;
    fetchPosts(profileId || null);
  }, [debouncedScrollY, profileId, postType]);

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
