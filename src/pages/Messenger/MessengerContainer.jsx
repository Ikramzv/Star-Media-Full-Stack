import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function MessengerContainer({ children }) {
  const { messages } = useSelector((state) => state.messages);
  const box = useRef();
  useEffect(() => {
    box.current && (box.current.scrollTop = box.current.scrollHeight);
  }, [messages.length]);
  return (
    <div className="chatBoxTop" ref={box}>
      {children}
    </div>
  );
}

export default MessengerContainer;
