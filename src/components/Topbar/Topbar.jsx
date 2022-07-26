import React, { useState } from "react";
import "./topbar.css";
import {
  ArrowBack,
  ArrowLeft,
  ArrowLeftOutlined,
  Chat,
  Notifications,
  Person,
  Search,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Topbar() {
  const [topRight, setTopRight] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <span className="logo" onClick={() => navigate("/")}>
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
          <span className="topbar-link" onClick={() => navigate("/")}>
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
        <Link to={"/profile"}>
          <img src="/logo.png" alt="" className="topbar-img" />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
