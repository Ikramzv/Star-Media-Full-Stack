import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { socket } from "../../constants";
import "./home.css";

function Home() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (socket && user) {
      socket.emit("sendUser", user?._id);
      socket.on("getUsers", (users) => {
        const onlines = users.filter((u) => u.userId !== user?._id);
        setOnlineFriends(onlines);
      });
    }
  }, [user]);

  return (
    <div>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar onlineFriends={onlineFriends} />
      </div>
    </div>
  );
}

export default React.memo(Home);
