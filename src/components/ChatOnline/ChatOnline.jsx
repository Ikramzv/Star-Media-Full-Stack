import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api";
import "./ChatOnline.css";

function ChatOnline({ online, setBar }) {
  const [friend, setFriend] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getOnline() {
      const { data } = await getUser(online.userId);
      setFriend(data);
    }
    getOnline();
  }, []);
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
            onClick={() => {
              setBar("close");
              navigate(`/profile/${online.userId}`);
            }}
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <b className="chatOnlineUsername">{friend?.username}</b>
      </div>
    </div>
  );
}

export default React.memo(ChatOnline);
