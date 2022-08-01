import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./message.css";
import { getUser } from "../../api";
import { useNavigate } from "react-router-dom";

function Message({ message }) {
  const currentUser = useSelector((state) => state.user.user);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getUserApi() {
      const { data } = await getUser(message.sender);
      setUser(data);
    }

    getUserApi();
  }, [message]);
  return (
    <div className={`message ${currentUser?._id === message.sender && "own"}`}>
      <div className="messageTop">
        <img
          src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
          alt=""
          className="messageImg"
          onClick={() => navigate(`/profile/${user?._id}`)}
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        <small>{moment(message.createdAt).fromNow()}</small>
      </div>
    </div>
  );
}

export default Message;
