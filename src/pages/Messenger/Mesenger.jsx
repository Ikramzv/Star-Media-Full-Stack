import React from "react";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./mesenger.css";

function Mesenger() {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <Sidebar messenger />
      </div>
      <div className="chatBox"></div>
      <div className="chatOnline">
        <Rightbar messenger />
      </div>
    </div>
  );
}

export default Mesenger;
