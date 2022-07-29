import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTimelinePosts } from "../../actions/postAction";
import { getTimeline, getUserAllPost } from "../../api";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";

function Feed({ userProfilePosts, profileId }) {
  const user = useSelector((state) => state.user.user);
  const { posts } = useSelector((state) => state.posts);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const dispatch = useDispatch();

  async function getProfilePosts() {
    const { data } = await getUserAllPost(profileId);
    setProfilePosts(data);
  }

  useEffect(() => {
    dispatch(getTimelinePosts());
    getProfilePosts();
  }, [currentPosts, profileId]);
  useEffect(() => {
    // Whenever posts change it will be re-computed profile posts though already invoked right above for initial rendering
    getProfilePosts();
  }, [posts]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {profileId ? profileId === user?._id && <Share /> : <Share />}
        {!userProfilePosts
          ? posts
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post, i) => <Post post={post} key={i} />)
          : profilePosts?.map((post, i) => <Post post={post} key={i} />)}
      </div>
    </div>
  );
}

export default Feed;
