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
import SearchedFriends from "./SearchedFriends";

function Sidebar({ messenger, setCurrentChat, currentChat }) {
  const [bar, setBar] = useState("");
  const { user } = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);
  const [value, setValue] = useState("");
  const [searchedFriend, setSearchFriend] = useState([]);
  const { conversation } = useSelector((state) => state.conversation);
  const [display, setDisplay] = useState(true);
  const [conversations, setConversations] = useState([]);

  const handleChange = (e) => {
    // Take a value from input and create list based on friends username
    if (value.length === 0) {
      setSearchFriend([]);
    }
    setValue(e.target.value);
    const searchTerm = e.target.value.toUpperCase();
    const searched = followings.filter(
      (friend) => friend?.username?.toUpperCase().indexOf(searchTerm) > -1
    );

    // If searched array is greater than 0 assign the list to searchedFriend and display it Conversation component otherwise
    // display followings array which is coming from database
    setSearchFriend(searched);
  };

  useEffect(() => {
    if (user) {
      async function Followings() {
        const { data } = await getFollowings(user?._id);
        setFollowings(data);
      }
      Followings();
    }
  }, [user]);

  useEffect(() => {
    if (value.length === 0) {
      setSearchFriend([]);
      setDisplay(true);
    }
  }, [value]);

  useEffect(() => {
    if (!display) {
      setValue("");
    }
  }, [display]);

  useEffect(() => {
    setConversations(conversation);
  }, [conversation]);

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
              <ul className="conversationList">
                {conversations?.map((c, i) => (
                  <Conversation
                    key={i}
                    conversation={c}
                    setCurrentChat={setCurrentChat}
                    setBar={setBar}
                    currentChat={currentChat}
                  />
                ))}
                <div
                  className={`${
                    display && searchedFriend.length > 0 && "searchedFriendList"
                  }`}
                >
                  {display && searchedFriend.length > 0 && (
                    <h4 style={{ margin: "5px 0 0 10px" }}>Searched ...</h4>
                  )}
                  {searchedFriend.length > 0 &&
                    display &&
                    searchedFriend?.map((friend, i) => (
                      <SearchedFriends
                        key={i}
                        friend={friend}
                        setDisplay={setDisplay}
                        setCurrentChat={setCurrentChat}
                        conversations={conversations}
                        setConversations={setConversations}
                        setBar={setBar}
                      />
                    ))}
                </div>
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

export default Sidebar;
