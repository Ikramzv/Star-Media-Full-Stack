import React from "react";
import ChatOnline from "../ChatOnline/ChatOnline";

const MessengerRightbar = ({ onlineFriends }) => {
  return onlineFriends.map((f, i) => <ChatOnline online={f} key={i} />);
};

export default MessengerRightbar;
