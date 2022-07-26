import React from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";

function Home() {
  return (
    <div>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}

export default Home;
