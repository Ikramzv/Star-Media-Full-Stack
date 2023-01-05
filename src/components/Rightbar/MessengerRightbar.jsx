import React from "react";
import ChatOnline from "../ChatOnline/ChatOnline";

const MessengerRightbar = ({ onlineFriends, setBar }) => {
  return onlineFriends.map((f, i) => (
    <ChatOnline setBar={setBar} online={f} key={i} />
  ));
};

export default React.memo(MessengerRightbar);
