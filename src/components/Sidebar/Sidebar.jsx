import React, { useEffect, useState } from "react";
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
  WorkOutline,
} from "@mui/icons-material";
import CloseFriend from "../CloseFriends/CloseFriend";
import Conversation from "../Conversations/Conversation";
import { getFollowings } from "../../api";
import { useSelector } from "react-redux";

function Sidebar({ messenger }) {
  const [bar, setBar] = useState("");
  const { user } = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);
  const [value, setValue] = useState("");
  const [searchedFriend, setSearchFriend] = useState([]);

  const handleChange = (e) => {
    // Take a value from input and create list based on friends username
    setValue(e.target.value);
    const searchTerm = e.target.value.toUpperCase();
    const searched = followings.filter(
      (friend) => friend?.username?.toUpperCase().indexOf(searchTerm) > -1
    );

    // If searched array is greater than 0 assign the list to searchedFriend and display it Conversation component otherwise
    // display followings array which is coming from database
    setSearchFriend(searched);
  };

  useEffect(() => {}, [searchedFriend, value]);

  useEffect(() => {
    async function Followings() {
      const { data } = await getFollowings(user?._id);
      setFollowings(data);
    }
    Followings();
  }, [user]);

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
            <div>
              <input
                placeholder="Search for friends to message.."
                type={"text"}
                className="chatFriendInput"
                value={value}
                onChange={handleChange}
              />
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {searchedFriend.length > 0
                  ? searchedFriend?.map((friend, i) => (
                      <Conversation key={i} friend={friend} />
                    ))
                  : value.length > 0 // if input value length greater than zero and searchFriend array length is 0 in this time nothing is displayed
                  ? ""
                  : followings?.map((friend, i) => (
                      <Conversation key={i} friend={friend} />
                    ))}
              </ul>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
