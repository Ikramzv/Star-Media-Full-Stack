import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUnreadMessagesRead } from "../../actions/messagesAction";
import "./Conversation.css";
import InteractiveLi from "./InteractiveLi";
import UnReadMessages from "./UnReadMessages";

function Conversation({ conversation, setBar }) {
  const { unreadMessages } = useSelector((state) => state.messages);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: convId } = useParams();

  const handleClick = async () => {
    if (unreadMessages.some((msg) => msg.conversationId === convId)) {
      dispatch(setUnreadMessagesRead(convId));
    }
    setBar("close");
    if (conversation?._id !== convId) {
      navigate(`/messenger/${conversation?._id}`);
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <InteractiveLi c={conversation}>
          <div className="chatListItem">
            <img
              src={
                conversation?.receiver?.userProfileImage
                  ? conversation?.receiver?.userProfileImage
                  : "/user.webp"
              }
              alt="user"
              className="chatListItemImg"
            />
            <strong>{conversation?.receiver?.username}</strong>
            <small style={{ marginLeft: "auto", color: "gray" }}>chat</small>
            <UnReadMessages conversation={conversation} />
          </div>
        </InteractiveLi>
      </div>
    </>
  );
}

export default React.memo(Conversation);
