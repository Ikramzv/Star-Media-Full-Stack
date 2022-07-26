import React, { useState } from "react";
import Online from "../Online/Online";
import "./Rightbar.css";

function Rightbar({ profile }) {
  const [bar, setBar] = useState("");

  const HomeRightbar = () => {
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
          {/* {Users.map((user , i) => (
              <Online user={user} key={i} />
            ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Paris</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img src="/user1.jpg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingUsername">John Doe</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={`hamburgerRight ${
          bar === "open" ? "openRightHamburger" : "close"
        } `}
        onClick={() => setBar("open")}
      >
        <div className="topRightbar"></div>
        <div className="bar"></div>
        <div className="bottomRightbar"></div>
      </div>
      <div
        className={`rightbar ${
          bar === "open"
            ? "openRightbar"
            : bar === "close"
            ? "closeRightbar"
            : ""
        } `}
      >
        <button
          className={`closeBtn hidden`}
          onClick={() => (bar === "open" ? setBar("close") : "")}
        >
          Close
        </button>
        <div className="rightbarWrapper">
          {profile ? <ProfileRightbar /> : <HomeRightbar />}
        </div>
      </div>
    </>
  );
}

export default Rightbar;
