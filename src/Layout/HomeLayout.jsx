import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/Topbar/Topbar";

function HomeLayout() {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
