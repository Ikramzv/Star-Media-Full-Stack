import React from "react";

function Online({ user }) {
  return (
    <>
      <li className="rightbarFriend">
        <div className="rightbarImgContainer">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="rightbarImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </>
  );
}

export default Online;
