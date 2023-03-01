import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function MemberContainer({ children, c }) {
  const li = useRef();
  const { id } = useParams();

  const setActiveMemmber = () => {
    document.querySelectorAll(".chatList").forEach((li) => {
      li.classList.remove("active");
    });
    li.current.classList.add("active");
  };

  useEffect(() => {
    const uname = li.current.querySelector("div strong").innerHTML;
    if (c?._id === id && c.receiver.username === uname) {
      setActiveMemmber();
    }
  }, [id]);

  return (
    <li className={`chatList`} ref={li} onClick={setActiveMemmber}>
      {children}
    </li>
  );
}

export default React.memo(MemberContainer);
