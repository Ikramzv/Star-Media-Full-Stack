import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

function InteractiveLi({ children, c }) {
  const li = useRef();
  const { id } = useParams();
  useEffect(() => {
    const uname = li.current.querySelector("div strong").innerHTML;
    if (c?._id === id && c.receiver.username === uname) {
      li.current.click();
    }
  }, [id]);

  return (
    <li
      className={`chatList`}
      ref={li}
      onClick={() => {
        document.querySelectorAll(".chatList").forEach((li) => {
          li.classList.remove("active");
        });
        li.current.classList.add("active");
      }}
    >
      {children}
    </li>
  );
}

export default React.memo(InteractiveLi);
