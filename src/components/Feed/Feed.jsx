import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProfilePostsAction } from "../../actions/postAction";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import Wrapper from "./Wrapper";

function Feed({ isProfilePage, profileUser }) {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  async function getProfilePosts() {
    dispatch(getProfilePostsAction(profileUser?._id));
  }

  useEffect(() => {
    if (isProfilePage) {
      getProfilePosts();
    }
  }, [profileUser?._id]);

  return (
    <div className="feed">
      <Wrapper posts={posts} isProfile={{ isProfilePage, profileUser }}>
        <Share />
        {posts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => (
            <Post post={post} key={post._id} />
          ))}
      </Wrapper>
    </div>
  );
}

export default React.memo(Feed);
