import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getAdditionalPostsToShow } from "../../actions/postAction";
import useDebounce from "../../hooks/useDebounce";
import useUpdateEffect from "../../hooks/useUpdateEffect";

let isAdditionalPostsCalled = {
  called: false,
};

let initialLoadScroll = true;

function Wrapper({ isProfile, posts, children }) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  const debouncedScrollY = useDebounce(scrollY, 100);

  useUpdateEffect(() => {
    if (!initialLoadScroll) {
      const container = wrapperRef.current;
      const limit = window.innerHeight + window.scrollY + 200;
      if (limit > container?.offsetHeight) {
        let since;
        if (isAdditionalPostsCalled.called) {
          since = posts[posts?.length - 1]?.createdAt;
        }
        console.log(since);
        dispatch(getAdditionalPostsToShow(since, isAdditionalPostsCalled));
      }
    }
    return () => {
      initialLoadScroll = false;
    };
  }, [debouncedScrollY]);

  useEffect(() => {
    const handleOnScroll = (e) => {
      setScrollY(window.scrollY);
    };
    if (!isProfile) {
      window.addEventListener("scroll", handleOnScroll);
    } else {
      window.removeEventListener("scroll", handleOnScroll);
    }
  }, [isProfile]);

  return (
    <div ref={wrapperRef} className="feedWrapper">
      {children}
    </div>
  );
}

export default Wrapper;
