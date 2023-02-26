import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { socket } from "./constants";
import withStore from "./hocs/withStore";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Mesenger from "./pages/Messenger/Mesenger";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import { setOnlineFriends } from "./slices/onlineFriendsSlice";

function App({ state }) {
  const { user, loading } = useMemo(() => state, Object.values(state));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      socket.close();
    } else {
      const s = socket.connect();
      s.emit("sendUser", user?._id);
      s.on("getUsers", (users) => {
        dispatch(setOnlineFriends(users));
      });
    }
  }, [user]);
  return (
    <div style={{ overflowX: "clip" }}>
      {loading && <CircularProgress color="error" className="loading" />}
      <Routes>
        <Route
          path="/"
          element={<Navigate replace={"/"} to={user ? "/home" : "/login"} />}
        />
        <Route path="/" element={<HomeLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/messenger" element={<Mesenger />} />
          <Route path="/messenger/:id" element={<Mesenger />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default withStore(App, ["loading", "user"]);
