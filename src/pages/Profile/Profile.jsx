import React from "react";
import "./profile.css";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";

function Profile() {
  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src="/user1.jpg" alt="" className="coverImg" />
              <img src="/user1.jpg" alt="" className="userImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">John Doe</h4>
              <span className="profileInfoDesc">This is a description</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
