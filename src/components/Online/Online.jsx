import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints } from "../../api";
import "./online.css";

function Online({ onlineFriend, setBar }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user, shallowEqual);

  const { useGetUserQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getUser: builder.query({
          query: (id) => `/users/${id}`,
        }),
      }),
    });
  }, []);

  const { data: user } = useGetUserQuery(onlineFriend.userId, {
    skip: onlineFriend.userId === currentUser?._id, // not sending request if it is currentUser
  });

  if (onlineFriend.userId === currentUser?._id) return "";

  return (
    <>
      <li
        className="rightbarFriend"
        onClick={() => {
          setBar("close");
          navigate(`/profile/${onlineFriend.userId}`);
        }}
      >
        <div className="rightbarImgContainer">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="rightbarImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user?.username}</span>
      </li>
    </>
  );
}

export default React.memo(Online);
