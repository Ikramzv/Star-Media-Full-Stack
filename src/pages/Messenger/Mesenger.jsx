import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getConvs } from "../../actions/conversationActions";
import { getMessages } from "../../actions/messagesAction";
import { getSingleConversation } from "../../api";
import Message from "../../components/Message/Message";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatInput from "./ChatInput";
import "./mesenger.css";
import MessengerContainer from "./MessengerContainer";

function Mesenger() {
  const { user } = useSelector((state) => state.user);
  const [currentChat, setCurrentChat] = useState(null);
  const { messages } = useSelector((state) => state.messages);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getConvs());
  }, [user?._id]);

  useEffect(() => {
    async function getConversation(id) {
      const { data } = await getSingleConversation(id);
      setCurrentChat(data);
    }
    if (id) {
      getConversation(id);
      dispatch(getMessages(id));
    } else {
      setCurrentChat(null);
    }
  }, [id]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        {<Sidebar messenger currentChat={currentChat} />}
      </div>
      <div className="chatBox">
        {id ? (
          <>
            <MessengerContainer>
              {messages.length ? (
                messages.map((m, i) => {
                  return (
                    <Message
                      receiver={currentChat?.receiver}
                      message={m}
                      key={i}
                    />
                  );
                })
              ) : (
                <div className="noMessagesContainer">
                  <span>Chat your friend</span>
                </div>
              )}
            </MessengerContainer>
            <div className="chatBoxBottom">
              <ChatInput
                currentChat={currentChat}
                setOnlineFriends={setOnlineFriends}
              />
            </div>
          </>
        ) : (
          <div className="noConversationContainer">
            <span>Open a conversation to start chat from the sidebar</span>
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
