import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { injectEndpoints } from "../../api";
import Message from "../../components/Message/Message";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import withStore from "../../hocs/withStore";
import { setCurrentChat } from "../../slices/currentChatSlice";
import ChatInput from "./ChatInput";
import "./mesenger.css";
import MessengerContainer from "./MessengerContainer";

function Mesenger({ state }) {
  const { messages, currentChat } = useMemo(() => state, Object.values(state));
  const dispatch = useDispatch();
  const { id: convId } = useParams();
  const loading = useRef(false);

  const { useLazyGetCurrentConversationQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getCurrentConversation: builder.query({
          query: (convId) => ({
            url: `/conversations/${convId}`,
          }),
        }),
      }),
    });
  }, []);

  const [getConversation] = useLazyGetCurrentConversationQuery();

  useEffect(() => {
    if (convId) {
      getConversation(convId, true).then(({ data }) =>
        dispatch(setCurrentChat(data))
      );
    } else {
      dispatch(setCurrentChat(null));
    }
  }, [convId]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        {<Sidebar messenger currentChat={currentChat} />}
      </div>
      <div className="chatBox">
        {convId ? (
          <>
            <MessengerContainer loading={loading}>
              {messages?.length ? (
                messages?.map((m, i) => {
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
                  {loading.current ? (
                    <CircularProgress color="error" />
                  ) : (
                    <span>Chat your friend</span>
                  )}
                </div>
              )}
            </MessengerContainer>
            <div className="chatBoxBottom">
              <ChatInput currentChat={currentChat} />
            </div>
          </>
        ) : (
          <div className="noConversationContainer">
            <span>Open a conversation to start chat from the sidebar</span>
          </div>
        )}
      </div>
      <div className="chatOnline">
        <Rightbar messenger />
      </div>
    </div>
  );
}

export default withStore(Mesenger, ["messages", "currentChat", "user"]);
