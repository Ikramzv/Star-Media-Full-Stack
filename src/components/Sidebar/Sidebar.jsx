import React, { useState } from "react";
import "./Sidebar.css";
import {
  Bookmark,
  Camera,
  Chat,
  Event,
  Group,
  HelpOutline,
  RssFeed,
  School,
  VideoCall,
  WorkOutline,
} from "@mui/icons-material";
import CloseFriend from "../CloseFriends/CloseFriend";

function Sidebar() {
  const [bar, setBar] = useState("");
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
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </li>
            <li className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </li>
            <li className="sidebarListItem">
              <Camera className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </li>
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Groups</span>
            </li>
            <li className="sidebarListItem">
              <Bookmark className="sidebarIcon" />
              <span className="sidebarListItemText">Bookmarks</span>
            </li>
            <li className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </li>
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Jobs</span>
            </li>
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
            <li className="sidebarListItem">
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </li>
          </ul>
          <button className="sidebarButton">Show more</button>
          <hr className="sidebarHr" />
          <ul className="sidebarFriendList">
            {/* {Users.map((user , i) => (
              <CloseFriend user={user} key={i} />
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
