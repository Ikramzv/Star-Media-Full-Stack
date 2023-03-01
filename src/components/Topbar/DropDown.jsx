import { Close, Logout, Person } from "@mui/icons-material";
import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { injectEndpoints } from "../../api";
import { logOut } from "../../slices/userReducer";

function DropDown({ user }) {
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  const { useLogoutMutation } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        logout: builder.mutation({
          query: () => ({
            method: "POST",
            url: "/auth/logout",
          }),
        }),
      }),
    });
  }, []);

  const [logOutMutation] = useLogoutMutation();

  const logout = () => {
    dispatch(logOut());
    logOutMutation();
  };

  const onClose = () => setDropDown(false);

  return (
    <>
      <img
        src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
        alt=""
        className="topbar-img"
        onClick={() => setDropDown((prev) => !prev)}
      />

      <ul className={`dropdownList ${dropDown ? "active" : ""}`}>
        <Close className="closeDropdown" onClick={onClose} />
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
          <li className="dropdownItem" onClick={onClose}>
            <Person />
            Profile
          </li>
        </Link>
        <li className="dropdownItem" onClick={logout}>
          <Logout />
          Logout
        </li>
      </ul>
    </>
  );
}

export default React.memo(DropDown);
