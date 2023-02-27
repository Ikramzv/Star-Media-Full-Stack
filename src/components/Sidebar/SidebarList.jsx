import {
  Bookmark,
  Camera,
  Chat,
  Event,
  Group,
  HelpOutline,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarList() {
  const navigate = useNavigate();
  return (
    <>
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <RssFeed className="sidebarIcon" />
          <span className="sidebarListItemText">Feed</span>
        </li>
        <li className="sidebarListItem" onClick={() => navigate("/messenger")}>
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
      </ul>
    </>
  );
}

export default SidebarList;
