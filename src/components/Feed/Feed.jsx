import React from "react";
import { useSelector } from "react-redux";
import Modal from "../../Modal/Modal";

import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import Wrapper from "./Wrapper";

function Feed({ isProfilePage, profileUser }) {
  const { posts } = useSelector((state) => state.posts);

  return (
    <div className="feed">
      <Wrapper posts={posts} isProfile={{ isProfilePage, profileUser }}>
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
        <Modal />
      </Wrapper>
    </div>
  );
}

export default React.memo(Feed);
