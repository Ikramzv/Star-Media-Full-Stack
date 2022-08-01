import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConvs } from "../../actions/conversationActions";
import { getMessages, sendMessageAction } from "../../actions/messagesAction";
import Message from "../../components/Message/Message";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import io from "socket.io-client";
import "./mesenger.css";
import { getSingleConversation } from "../../api";

function Mesenger() {
  const { user } = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(null);
  const { messages } = useSelector((state) => state.messages);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [socketMessage, setSocketMessage] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const socket = useRef();

  const box = useRef();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [value, setValue] = useState("");

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    socket.current.on("connect_error", (err) => {
      console.log(err);
    });
    socket.current.on("getMessage", (data) => {
      setSocketMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socketMessage &&
      currentChat?.members.includes(socketMessage.sender) &&
      // friend display
      setCurrentMessages([...currentMessages, socketMessage]);
  }, [socketMessage, currentChat]);

  const sendMessage = () => {
    // dispatch action
    dispatch(
      sendMessageAction({
        conversationId: currentChat?._id,
        text: value,
      })
    );
    // clear input
    setValue("");
    // self display
    setCurrentMessages([
      ...currentMessages,
      {
        conversationId: currentChat?._id,
        text: value,
        sender: user?._id,
      },
    ]);

    // socket
    const receiverId = currentChat.members.find((id) => id !== user?._id); // find receiver

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId: receiverId,
      text: value,
      conversationId: currentChat?._id,
    });
  };

  useEffect(() => {
    !socketMessage && setCurrentMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (socket && user) {
      socket.current.emit("sendUser", user?._id);
      socket.current.on("getUsers", (users) => {
        setOnlineFriends(users.filter((u) => u.userId !== user?._id));
      });
    }
    dispatch(getConvs());
  }, [user]);

  useEffect(() => {
    box.current && (box.current.scrollTop = box.current.scrollHeight);
  }, [currentMessages]);

  useEffect(() => {
    async function getConversation(id) {
      const { data } = await getSingleConversation(id);
      setCurrentChat(data);
    }
    if (id) {
      dispatch(getMessages(id));
      getConversation(id);
    } else {
      setCurrentChat(null);
    }
  }, [id]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <Sidebar
          messenger
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
        />
      </div>
      <div className="chatBox">
        {id ? (
          <>
            <div className="chatBoxTop" ref={box}>
              {currentMessages.map((m, i) => {
                return <Message message={m} key={i} />;
              })}
            </div>
            <div className="chatBoxBottom">
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
            </div>
          </>
        ) : (
          <div className="noConversationContainer">
            <span>Open a conversation to start chat</span>
          </div>
        )}
      </div>
      <div className="chatOnline">
        <Rightbar messenger onlineFriends={onlineFriends} />
      </div>
    </div>
  );
}

export default Mesenger;
