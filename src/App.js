import { CircularProgress } from "@mui/material";
import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import RealtimeSocketMessages from "./components/Socket/Socket";
import withStore from "./hocs/withStore";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Mesenger from "./pages/Messenger/Mesenger";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";

function App({ state }) {
  const { loading, user } = useMemo(() => state, Object.values(state));

  return (
    <div style={{ overflowX: "clip" }}>
      <Auth>
        <RealtimeSocketMessages>
          {loading ? (
            <CircularProgress color="error" className="loading" />
          ) : (
            ""
          )}
          <Routes>
            <Route
              path="/"
              element={
                <Navigate replace={"/"} to={user ? "/home" : "/login"} />
              }
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
        </RealtimeSocketMessages>
      </Auth>
    </div>
  );
}

export default withStore(App, ["loading", "user"]);
