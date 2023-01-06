import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import SERVER_URL from "../../constants";
import "./home.css";

function Home() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const socket = useRef();
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    socket.current = io(SERVER_URL, {
      transports: ["websocket"],
    });
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (socket && user) {
      socket.current.emit("sendUser", user?._id);
      socket.current.on("getUsers", (users) => {
        const onlines = users.filter((u) => u.userId !== user?._id);
        if (!onlines.length) return;
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
