import React from "react";
import { useNavigate } from "react-router-dom";
import "./closeFriend.css";

function CloseFriend({ friend, setBar }) {
  const navigate = useNavigate();
  return (
    <>
      <li
        className="sidebarFriend"
        onClick={() => {
          setBar("close");
          navigate(`/profile/${friend?._id}`);
        }}
      >
        <img
          src={friend.userProfileImage ? friend.userProfileImage : "/user.webp"}
          alt=""
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{friend.username}</span>
      </li>
    </>
  );
}

export default CloseFriend;
