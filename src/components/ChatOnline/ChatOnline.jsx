import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints } from "../../api";
import "./ChatOnline.css";

function ChatOnline({ online, setBar }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { useGetUserQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getUser: builder.query({
          query: (id) => `/users/${id}`,
        }),
      }),
    });
  }, []);

  const { data: friend } = useGetUserQuery(online.userId, {
    skip: online.userId === user?._id, // not sending request if it is currentUser
  });

  if (online.userId === user?._id) return "";

  return (
    <div className="chatOnline">
      <div
        className="chatOnlineFriend"
        onClick={() => {
          setBar("close");
          navigate(`/profile/${online.userId}`);
        }}
      >
        <div className="chatOnlineImgContainer">
          <img
            src={
              friend?.userProfileImage ? friend?.userProfileImage : `/user.webp`
            }
            alt=""
            className="chatOnlineImg"
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <b className="chatOnlineUsername">{friend?.username}</b>
      </div>
    </div>
  );
}

export default React.memo(ChatOnline);
