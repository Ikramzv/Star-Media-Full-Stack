import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function UnReadMessages({ conversation }) {
  const { unreadMessages } = useSelector((state) => state.messages);

  const unreadMsgs = useMemo(
    () =>
      unreadMessages.filter((msg) => msg.conversationId === conversation?._id),
    []
  );
  return (
    <span
      className={`${
        unreadMsgs.length > 0
          ? "chatListItemNotificationBadge"
          : "nonNotification"
      }`}
    >
      {unreadMsgs.length}
    </span>
  );
}

export default React.memo(UnReadMessages);
