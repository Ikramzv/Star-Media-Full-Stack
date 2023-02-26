import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ChatOnline from "../ChatOnline/ChatOnline";

const MessengerRightbar = ({ setBar }) => {
  const onlineFriends = useSelector(
    (state) => state.onlineFriends,
    shallowEqual
  );
  return onlineFriends.map((f, i) => (
    <ChatOnline setBar={setBar} online={f} key={i} />
  ));
};

export default React.memo(MessengerRightbar);
