import React, { useEffect } from "react";
import "./home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  } ,[user])
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
