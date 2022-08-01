import React, { useEffect, useState } from "react";
import { getFollowings } from "../../api";
import ChatOnline from "../ChatOnline/ChatOnline";
import Online from "../Online/Online";
import Following from "./Followings/Following";
import "./Rightbar.css";

function Rightbar({ user, messenger, onlineFriends }) {
  const [bar, setBar] = useState("");
  const [friends, setFriends] = useState([]);

  async function getFollowingsUser() {
    if (user?.followings?.length > 0) {
      const { data } = await getFollowings(user?._id);
      setFriends(data);

      return data;
    }
  }

  useEffect(() => {
    if (user) {
      getFollowingsUser();
    }
  }, [user]);

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
          {onlineFriends.map((online, i) => (
            <Online onlineFriends={online} key={i} />
          ))}
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
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user?.relationship === "1"
                ? "Single"
                : user?.relationship === "2"
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Following user={friend} key={friend?._id} />
          ))}
        </div>
      </>
    );
  };

  const MessengerRightbar = () => {
    return onlineFriends.map((f, i) => <ChatOnline online={f} key={i} />);
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
          {!messenger ? (
            user ? (
              <>
                <ProfileRightbar />
              </>
            ) : (
              <HomeRightbar />
            )
          ) : (
            <MessengerRightbar />
          )}
        </div>
      </div>
    </>
  );
}

export default Rightbar;
