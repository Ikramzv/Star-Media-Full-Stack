import { Close, Logout, Person } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../actions/userAction";

function DropDown({ user }) {
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutUser());
  };
  return (
    <>
      <img
        src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
        alt=""
        className="topbar-img"
        onMouseOver={() => setDropDown(true)}
      />
      {dropDown && (
        <ul className="dropdownList">
          <Close
            className="closeDropdown"
            onTransitionEnd={() => setDropDown(false)}
          />
          <li className="dropdownItem" onClick={() => setDropDown(false)}>
            <Link
              to={`/profile/${user?._id}`}
              style={{
                color: "white",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Person />
              Profile
            </Link>
          </li>
          <li className="dropdownItem" onClick={logOut}>
            <Logout />
            Logout
          </li>
        </ul>
      )}
    </>
  );
}

export default React.memo(DropDown);
