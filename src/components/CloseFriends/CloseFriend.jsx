import React from "react";
import "./closeFriend.css";

function CloseFriend({ user }) {
  return (
    <>
      <li className="sidebarFriend">
        <img src={user.img} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </>
  );
}

export default CloseFriend;
