import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Mesenger from "./pages/Messenger/Mesenger";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";

function App() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div style={{ overflowX: "clip" }}>
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

export default App;
