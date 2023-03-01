import React from "react";
import { useNavigate } from "react-router-dom";
import "./Conversation.css";
import MemberContainer from "./MemberContainer";

function Conversation({ conversation, setBar }) {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    setBar("close");
    navigate(`/messenger/${conversation?._id}`);
  };

  return (
    <>
      <div onClick={handleClick}>
        <MemberContainer c={conversation}>
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
          </div>
        </MemberContainer>
      </div>
    </>
  );
}

export default React.memo(Conversation);
