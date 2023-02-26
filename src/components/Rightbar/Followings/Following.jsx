import React from "react";
import { useNavigate } from "react-router-dom";

function Following({ user, setBar }) {
  const navigate = useNavigate("");

  return (
    <div
      className="rightbarFollowing"
      onClick={() => {
        setBar("close");
        navigate(`/profile/${user._id}`);
      }}
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
