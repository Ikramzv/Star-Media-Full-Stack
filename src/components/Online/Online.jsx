import React, { useEffect, useState } from "react";
import "./online.css";
import { getUser } from "../../api";
import { useNavigate } from "react-router-dom";

function Online({ onlineFriends }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function getSingleUser() {
      const { data } = await getUser(onlineFriends.userId);
      setUser(data);
    }

    getSingleUser();
  }, [onlineFriends]);
  return (
    <>
      <li className="rightbarFriend">
        <div className="rightbarImgContainer">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="rightbarImg"
            onClick={() => navigate(`/profile/${onlineFriends.userId}`)}
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user?.username}</span>
      </li>
    </>
  );
}

export default Online;
