import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTimelinePosts } from "../../actions/postAction";
import { getUserAllPost } from "../../api";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import Wrapper from "./Wrapper";

function Feed({ userProfilePosts, profileId }) {
  const user = useSelector((state) => state.user.user);
  const { posts } = useSelector((state) => state.posts);
  const [profilePosts, setProfilePosts] = useState([]);
  const dispatch = useDispatch();

  async function getProfilePosts() {
    const { data } = await getUserAllPost(profileId);
    setProfilePosts(data);
  }

  useEffect(() => {
    dispatch(getTimelinePosts());
  }, []);

  useEffect(() => {
    if (userProfilePosts) {
      getProfilePosts();
    }
  }, [profileId]);

  return (
    <div className="feed">
      <Wrapper posts={posts} isProfile={userProfilePosts}>
        {profileId ? profileId === user?._id && <Share /> : <Share />}
        {!userProfilePosts
          ? posts
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post, i) => <Post post={post} key={i} />)
          : profilePosts?.map((post, i) => <Post post={post} key={i} />)}
      </Wrapper>
    </div>
  );
}

export default Feed;
