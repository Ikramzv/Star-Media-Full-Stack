import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Following({ user }) {
  const navigate = useNavigate("");
  useEffect(() => {}, [user]);
  return (
    <div
      className="rightbarFollowing"
      onClick={() => navigate(`/profile/${user._id}`)}
    >
      <img
        src={user?.userProfileImage ? user?.userProfileImage : `/user.webp`}
        alt=""
        className="rightbarFollowingImg"
      />
      <span className="rightbarFollowingUsername">{user?.username}</span>
    </div>
  );
}

export default Following;
