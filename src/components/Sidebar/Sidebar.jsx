import { CircularProgress } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { injectEndpoints } from "../../api";
import CloseFriend from "../CloseFriends/CloseFriend";
import "./Sidebar.css";
import SidebarForMessenger from "./SidebarForMessenger";
import SidebarList from "./SidebarList";

function Sidebar({ messenger, currentChat }) {
  const [bar, setBar] = useState("");
  const user = useSelector((state) => state.user);
  const { useGetFollowingsQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getFollowings: builder.query({
          query: (id) => ({
            url: `/users/followings/${id}`,
          }),
          transformResponse: (res) => res.followings,
        }),
      }),
    });
  }, [user?._id]);

  const { data: followings, isLoading } = useGetFollowingsQuery(user?._id);

  return (
    <>
      <div
        onClick={() => setBar("open")}
        className={`hamburger ${bar === "open" ? "open" : "close"}`}
      >
        <div className="topBar"></div>
        <div className="bar"></div>
        <div className="bottomBar"></div>
      </div>
      <div
        className={`sidebar ${
          bar === "open" ? "openSidebar" : bar === "close" ? "closeSidebar" : ""
        }`}
      >
        <button
          className={`closeBtn hidden`}
          onClick={() => (bar === "open" ? setBar("close") : "")}
        >
          Close
        </button>
        <div className="sidebarWrapper">
          {messenger ? (
            <SidebarForMessenger
              currentChat={currentChat}
              followings={followings}
              setBar={setBar}
            />
          ) : (
            <>
              <SidebarList />
              <button className="sidebarButton">Show more</button>
              <hr className="sidebarHr" />
              <h3 style={{ marginBottom: "10px", fontWeight: 400 }}>
                Your followings
              </h3>
              <ul className="sidebarFriendList">
                {!isLoading ? (
                  followings?.map((f, i) => (
                    <CloseFriend friend={f} key={i} setBar={setBar} />
                  ))
                ) : (
                  <CircularProgress style={{ margin: "auto" }} color="error" />
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Sidebar);
