import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { sendMessageAction } from "../../actions/messagesAction";
import SERVER_URL from "../../constants";

function ChatInput({ currentChat, setOnlineFriends }) {
  const [value, setValue] = useState("");
  const [socketMessage, setSocketMessage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const socket = useRef();

  const sendMessage = () => {
    // dispatch action
    dispatch(
      sendMessageAction({
        conversationId: currentChat?._id,
        text: value,
        sender: user?._id,
        createdAt: Date.now(),
      })
    );
    // clear input
    setValue("");

    // socket
    const receiverId = currentChat.members.find((id) => id !== user?._id); // find receiver

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId: receiverId,
      text: value,
      conversationId: currentChat?._id,
      receiver: {
        userProfileImage: user?.userProfileImage,
      },
    });
  };

  useEffect(() => {
    socket.current = io(SERVER_URL, {
      transports: ["websocket"],
    });
    socket.current.on("getMessage", (data) => {
      setSocketMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: Date.now(),
        receiver: data.receiver,
      });
    });
  }, []);

  useEffect(() => {
    if (socket && user?._id) {
      socket.current.emit("sendUser", user?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineFriends(users.filter((u) => u.userId !== user?._id));
      });
    }
  }, [user?._id]);

  useEffect(() => {
    socketMessage &&
      currentChat?.members.includes(socketMessage.sender) &&
      // friend display
      dispatch(sendMessageAction(socketMessage, "socket_message"));
  }, [socketMessage, currentChat]);

  return (
    <>
      <textarea
        className="chatMessageTextarea"
        placeholder="write message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button
        className="chatSubmitButton"
        onClick={sendMessage}
        disabled={value.length === 0}
      >
        Send
      </button>
    </>
  );
}

export default React.memo(ChatInput);
