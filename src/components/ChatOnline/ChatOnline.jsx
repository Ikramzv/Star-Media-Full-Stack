import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import "./ChatOnline.css";

function ChatOnline({ online }) {
  const [friend, setFriend] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getOnline() {
      const { data } = await getUser(online.userId);
      setFriend(data);
    }
    getOnline();
  }, [online]);
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src={
              friend?.userProfileImage ? friend?.userProfileImage : `/user.webp`
            }
            alt=""
            className="chatOnlineImg"
            onClick={() => navigate(`/profile/${online.userId}`)}
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <b className="chatOnlineUsername">{friend?.username}</b>
      </div>
    </div>
  );
}

export default ChatOnline;
