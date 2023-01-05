import React from "react";
import Online from "../Online/Online";

const HomeRightbar = ({ onlineFriends }) => {
  return (
    <>
      <div className="birthdayContainer">
        <img src="/logo.png" alt="" className="birthdayImg" />
        <span className="birthdayText">
          {" "}
          <b>Pola Faster</b> and <b>3 other friends</b> have a birthday. today
        </span>
      </div>
      <img src="/group.webp" alt="" className="rightbarAd" />
      <h4 className="rightbarTitle">Online friends</h4>
      <ul className="rightbarFriendList">
        {onlineFriends.map((online, i) => (
          <Online onlineFriends={online} key={i} />
        ))}
      </ul>
    </>
  );
};

export default React.memo(HomeRightbar);
