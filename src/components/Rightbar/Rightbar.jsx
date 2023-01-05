import React, { useState } from "react";
import HomeRightbar from "./HomeRightbar";
import MessengerRightbar from "./MessengerRightbar";
import ProfileRightbar from "./ProfileRightbar";
import "./Rightbar.css";

function Rightbar({ user, messenger, onlineFriends }) {
  const [bar, setBar] = useState("");

  return (
    <>
      <div
        className={`hamburgerRight ${
          bar === "open" ? "openRightHamburger" : "close"
        } `}
        onClick={() => setBar("open")}
      >
        <div className="topRightbar"></div>
        <div className="bar"></div>
        <div className="bottomRightbar"></div>
      </div>
      <div
        className={`rightbar ${
          bar === "open"
            ? "openRightbar"
            : bar === "close"
            ? "closeRightbar"
            : ""
        } `}
      >
        <button
          className={`closeBtn hidden`}
          onClick={() => (bar === "open" ? setBar("close") : "")}
        >
          Close
        </button>
        <div className="rightbarWrapper">
          {!messenger ? (
            user ? (
              <>
                <ProfileRightbar profileUser={user} />
              </>
            ) : (
              <HomeRightbar onlineFriends={onlineFriends} />
            )
          ) : (
            <MessengerRightbar onlineFriends={onlineFriends} />
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(Rightbar);
