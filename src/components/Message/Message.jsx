import moment from "moment";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./message.css";

function Message({ message }) {
  const currentUser = useSelector((state) => state.user.user);
  const { messages } = useSelector((state) => state.messages);
  const navigate = useNavigate();
  const user = useMemo(() => {
    if (message.sender === currentUser?._id) return currentUser;
    else return message.receiver;
  }, [messages.length, message]);

  return (
    <div className={`message ${currentUser?._id === message.sender && "own"}`}>
      <div className="messageTop">
        <img
          src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
          alt=""
          className="messageImg"
          onClick={() => navigate(`/profile/${message.sender}`)}
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
