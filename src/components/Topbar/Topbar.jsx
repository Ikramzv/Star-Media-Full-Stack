import React, { useState } from "react";
import "./topbar.css";
import {
  ArrowBack,
  ArrowLeft,
  ArrowLeftOutlined,
  Chat,
  Close,
  Logout,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../actions/userAction";

function Topbar() {
  const [topRight, setTopRight] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
  };

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
            <span className="topbar-icon-badge">1</span>
          </div>
          <div className="topbar-icon-item">
            <Chat />
            <span className="topbar-icon-badge">2</span>
          </div>
          <div className="topbar-icon-item">
            <Notifications />
            <span className="topbar-icon-badge">1</span>
          </div>
        </div>
        <div className="topbarDropdown">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="topbar-img"
            onMouseOver={() => setDropDown(true)}
          />
          {dropDown && (
            <ul className="dropdownList">
              <Close
                className="closeDropdown"
                onTransitionEnd={() => setDropDown(false)}
              />
              <li className="dropdownItem" onClick={() => setDropDown(false)}>
                <Link
                  to={`/profile/${user?._id}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Person />
                  Profile
                </Link>
              </li>
              <li className="dropdownItem" onClick={logOut}>
                <Logout />
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
