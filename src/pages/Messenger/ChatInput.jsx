import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectEndpoints, updateQueryData } from "../../api";
import { socket } from "../../constants";
import { sendMessageAction } from "../../slices/messagesReducer";

const msg = [];

function ChatInput({ currentChat }) {
  const [value, setValue] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { useSendMessageMutation } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        sendMessage: builder.mutation({
          query: (msg) => ({
            body: msg,
            url: `/messages`,
            method: "POST",
          }),
        }),
      }),
    });
  }, []);

  const [sendMessageMutation] = useSendMessageMutation();

  const sendMessage = () => {
    // dispatch an action
    const msg = {
      conversationId: currentChat?._id,
      text: value,
      sender: user?._id,
      createdAt: Date.now(),
    };

    dispatch(sendMessageAction(msg));
    dispatch(
      updateQueryData("getMessages", currentChat?._id, (messages) => {
        return [...messages, msg];
      })
    );
    // trigger the mutation
    sendMessageMutation(msg);

    // clear input
    setValue("");

    // socket
    const receiverId = currentChat.members.find((id) => id !== user?._id); // find receiver

    socket.emit("sendMessage", {
      // "getMessage" event is in the Socket Component
      senderId: user?._id,
      receiverId: receiverId,
      text: value,
      conversationId: currentChat?._id,
      receiver: {
        userProfileImage: user?.userProfileImage,
      },
    });
  };

  return (
    <>
      <textarea
        className="chatMessageTextarea"
        placeholder="write message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button
        className="chatSubmitButton"
        onClick={sendMessage}
        disabled={value.length === 0}
      >
        Send
      </button>
    </>
  );
}

export default React.memo(ChatInput);
