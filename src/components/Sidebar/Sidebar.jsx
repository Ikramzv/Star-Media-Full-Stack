import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFollowings } from "../../api";
import CloseFriend from "../CloseFriends/CloseFriend";
import "./Sidebar.css";
import SidebarForMessenger from "./SidebarForMessenger";
import SidebarList from "./SidebarList";

function Sidebar({ messenger, currentChat }) {
  const [bar, setBar] = useState("");
  const { user } = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    if (user) {
      async function getUserFollowings() {
        const { data } = await getFollowings(user?._id);
        setFollowings(data.followings);
      }
      getUserFollowings();
    }
  }, [user._id]);

  return (
    <>
      <div
        onClick={() => setBar("open")}
        className={`hamburger ${bar === "open" ? "open" : "close"}`}
      >
        <div className="topBar"></div>
        <div className="bar"></div>
        <div className="bottomBar"></div>
      </div>
      <div
        className={`sidebar ${
          bar === "open" ? "openSidebar" : bar === "close" ? "closeSidebar" : ""
        }`}
      >
        <button
          className={`closeBtn hidden`}
          onClick={() => (bar === "open" ? setBar("close") : "")}
        >
          Close
        </button>
        <div className="sidebarWrapper">
          {messenger ? (
            <SidebarForMessenger
              currentChat={currentChat}
              followings={followings}
              setBar={setBar}
            />
          ) : (
            <>
              <SidebarList />
              <button className="sidebarButton">Show more</button>
              <hr className="sidebarHr" />
              <ul className="sidebarFriendList">
                {followings.map((f, i) => (
                  <CloseFriend friend={f} key={i} setBar={setBar} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Sidebar);
