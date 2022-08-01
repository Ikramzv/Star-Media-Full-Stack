import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setConversationMessageRead, getAllMessages } from "../../api";
import "./Conversation.css";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SET_UNREAD_MESSAGES } from "../../actions/actionTypes";

function Conversation({ conversation, setCurrentChat, setBar, currentChat }) {
  const [active, setActive] = useState(false);
  const li = useRef();
  const currentUser = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading);
  const [user, setUser] = useState({});
  const unreadMessages = useSelector((state) => state.messages.unreadMessages);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch({
      type: SET_UNREAD_MESSAGES,
      payload: unreadMessages.filter(
        (msg) => msg.conversationId !== conversation?._id
      ),
    });
    setBar("close");
    setCurrentChat(conversation);
    navigate(`/messenger/${conversation?._id}`);
    await setConversationMessageRead(conversation?._id);
  };

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser?._id);
    async function getUserApi() {
      const { data } = await getUser(friendId);
      setUser(data);
    }

    async function getUnreadMessageForConversation() {
      const { data } = await getAllMessages();
      const message = data.filter(
        (msg) => msg.read === false && msg.conversationId === currentChat?._id
      );
      if (message.length > 0) {
        dispatch({
          type: SET_UNREAD_MESSAGES,
          payload: unreadMessages.filter(
            (msg) => msg.conversationId !== currentChat?._id
          ),
        });
        return await setConversationMessageRead(currentChat?._id);
      } else {
        return dispatch({
          type: SET_UNREAD_MESSAGES,
          payload: data.filter(
            (msg) => msg.read === false && msg.sender !== currentUser?._id
          ),
        });
      }
    }

    getUnreadMessageForConversation();
    getUserApi();
  }, [conversation]);

  useEffect(() => {
    const filter = Array.from(document.querySelectorAll(".chatList")).filter(
      (li) => li.classList.contains("active")
    );

    if (filter.length > 1) {
      filter
        .filter((list) => list !== li.current)
        .forEach((list) => list.classList.remove("active"));
    }
  }, [active]);

  return (
    <>
      {loading && <CircularProgress className="loading" />}
      <div onClick={handleClick}>
        <li
          className={`chatList`}
          ref={li}
          onClick={() => {
            li.current.classList.add("active");
            setActive(!active);
          }}
        >
          <div className="chatListItem">
            <img
              src={
                user?.userProfileImage ? user?.userProfileImage : "/user.webp"
              }
              alt="user"
              className="chatListItemImg"
            />
            <strong>{user?.username}</strong>
            <small style={{ marginLeft: "auto", color: "gray" }}>chat</small>
            <span
              className={`${
                unreadMessages.filter(
                  (msg) => msg.conversationId === conversation?._id
                ).length > 0
                  ? "chatListItemNotificationBadge"
                  : "nonNotification"
              }`}
            >
              {
                unreadMessages.filter(
                  (msg) => msg.conversationId === conversation?._id
                ).length
              }
            </span>
          </div>
        </li>
      </div>
    </>
  );
}

export default Conversation;
