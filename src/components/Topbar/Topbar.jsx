import {
  ArrowBack,
  Chat,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_UNREAD_MESSAGES } from "../../actions/actionTypes";
import { getAllMessages, getUserWithQuery } from "../../api";
import DropDown from "./DropDown";
import "./topbar.css";

function Topbar() {
  const [topRight, setTopRight] = useState(false);
  const navigate = useNavigate();
  const { user, unreadMessages } = useSelector((state) => ({
    user: state.user.user,
    unreadMessages: state.messages.unreadMessages,
  }));
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleKeyUp = async (e) => {
    if (e.keyCode === 13) {
      setValue("");
      const { data } = await getUserWithQuery(value);
      if (data) return navigate(`/profile/${data?._id}`);
      alert(`No user was found with the given username : ${value}`);
    }
  };

  useEffect(() => {
    async function getMessages() {
      const { data } = await getAllMessages();
      dispatch({
        type: SET_UNREAD_MESSAGES,
        payload: data.filter(
          (msg) => msg.read === false && msg.sender !== user?._id
        ),
      });
    }

    getMessages();
  }, []);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <span className="logo" onClick={() => navigate("/home")}>
          Star Media
        </span>
      </div>
      <div className={`topbar-center ${topRight ? "hideCenter" : ""}`}>
        <div className="searchbar">
          <Search className="search-icon" />
          <input
            type={"text"}
            placeholder="Search for friends, posts or any video"
            className="searchInput"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      <div className={`topbar-right ${topRight ? "growRight" : "growBack"}`}>
        <ArrowBack
          className={`hidden ${topRight ? "rotate" : "rotateBack"}`}
          onClick={() => setTopRight(!topRight)}
        />
        <div className="topbar-links">
          <span className="topbar-link" onClick={() => navigate("/home")}>
            Home
          </span>
          <span className="topbar-link">Timeline</span>
        </div>
        <div className="topbar-icons">
          <div className="topbar-icon-item">
            <Person />
          </div>
          <div
            className="topbar-icon-item"
            onClick={() => navigate("/messenger")}
          >
            <Chat />
            <span
              className={`${
                unreadMessages.length > 0
                  ? "topbar-icon-badge"
                  : "nonNotification"
              }`}
            >
              {unreadMessages.length}
            </span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
          </div>
        </div>
        <div className="topbarDropdown">
          <DropDown user={user} />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
