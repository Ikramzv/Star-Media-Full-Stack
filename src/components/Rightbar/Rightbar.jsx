import { Add, Remove } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../actions/userAction";
import {
  followUserApi,
  getFollowings,
  getFollowingUser,
  unfollowUserApi,
} from "../../api";
import Online from "../Online/Online";
import Following from "./Followings/Following";
import "./Rightbar.css";

function Rightbar({ user }) {
  const [bar, setBar] = useState("");
  const [followingUsers, setFollowingUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const followings = useSelector((state) => state.user.followings);
  const [friends, setFriends] = useState([]);

  async function getFollowingUserOnline() {
    const { data } = await getFollowingUser(currentUser?._id);
    setFollowingUsers(data);
  }

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
    } else {
      getFollowingUserOnline();
    }
  }, [user, followings]);

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
          {followingUsers.map((user, i) => (
            <Online user={user} key={i} />
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
          {user ? (
            <>
              <ProfileRightbar />
            </>
          ) : (
            <HomeRightbar />
          )}
        </div>
      </div>
    </>
  );
}

export default Rightbar;
