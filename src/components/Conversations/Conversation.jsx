import React, { useEffect, useRef, useState } from "react";
import "./Conversation.css";

function Conversation({ friend }) {
  const [active, setActive] = useState(false);
  const li = useRef();

  useEffect(() => {}, [friend]);
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
    <div>
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
              friend?.userProfileImage ? friend?.userProfileImage : "/user.webp"
            }
            alt="user"
            className="chatListItemImg"
          />
          <strong>{friend?.username}</strong>
        </div>
      </li>
    </div>
  );
}

export default Conversation;
