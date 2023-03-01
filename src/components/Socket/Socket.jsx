import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQueryData } from "../../api";
import { socket } from "../../constants";
import {
  deleteMessageAction,
  editMessageAction,
  sendMessageAction,
} from "../../slices/messagesReducer";
import { deleteRecipe, updateRecipe } from "../../utils";

function Socket({ children }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages);
  useEffect(() => {
    socket.on("getMessage", (data) => {
      dispatch(sendMessageAction(data));
      dispatch(
        updateQueryData("getMessages", data?.conversationId, (messages) => {
          return [...messages, data];
        })
      );
    });

    return () => {
      socket.off("getMessage");
    };
  }, []);

  useEffect(() => {
    socket.on("deleteMessageClient", ({ msgId, conversationId }) => {
      const newState = deleteRecipe(messages, msgId);
      dispatch(deleteMessageAction(newState));
      dispatch(
        updateQueryData("getMessages", conversationId, () => {
          return newState;
        })
      );
    });

    socket.on("editMessageClient", ({ msgId, msgText, conversationId }) => {
      const newState = updateRecipe(
        messages,
        { itemId: msgId, change: msgText },
        "text"
      );
      dispatch(editMessageAction(newState));
      dispatch(
        updateQueryData("getMessages", conversationId, () => {
          return newState;
        })
      );
    });

    return () => {
      socket.off("deleteMessageClient");
      socket.off("editMessageClient");
    };
  }, [messages]);

  return children;
}

export default Socket;
