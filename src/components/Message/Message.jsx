import moment from "moment";
import React, { useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectEndpoints, updateQueryData } from "../../api";
import ActionsButtons from "../../common/ActionsButton/ActionsButtons";
import { socket } from "../../constants";
import useRegex from "../../hooks/useRegex";
import { regexUrl } from "../../regex/url";
import {
  deleteMessageAction,
  editMessageAction,
} from "../../slices/messagesReducer";
import { updateRecipe } from "../../utils";
import "./message.css";

function Message({ message, receiverId }) {
  const currentUser = useSelector((state) => state.user, shallowEqual);
  const navigate = useNavigate();
  const user = useMemo(() => {
    if (message.sender === currentUser?._id) return currentUser;
    else return message.receiver;
  }, [message]);

  const { useDeleteMessageMutation, useEditMessageMutation } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        deleteMessage: builder.mutation({
          query: ({ _id: msgId }) => ({
            url: `/messages/message/${msgId}`,
            method: "DELETE",
          }),
          transformResponse(res, m, msgId) {
            console.log(res, msgId);
            return res;
          },
          onQueryStarted(arg, { dispatch }) {
            const { _id: msgId, conversationId, receiverId } = arg;
            socket.emit("deleteMessage", {
              msgId,
              conversationId,
              receiverId,
            });
            dispatch(deleteMessageAction(msgId));
            dispatch(
              updateQueryData("getMessages", conversationId, (messages) => {
                return messages.filter((msg) => msg._id !== msgId);
              })
            );
          },
        }),
        editMessage: builder.mutation({
          query: ({ _id: msgId, msgText }) => ({
            url: `/messages/message/${msgId}`,
            body: { msgText },
            method: "PATCH",
          }),
          onQueryStarted(arg, { dispatch }) {
            const { _id: msgId, conversationId, receiverId, msgText } = arg;
            socket.emit("editMessage", {
              msgId,
              conversationId,
              receiverId,
              msgText,
            });
            dispatch(editMessageAction({ msgId, msgText }));
            dispatch(
              updateQueryData("getMessages", conversationId, (messages) => {
                return updateRecipe(
                  messages,
                  { itemId: msgId, change: msgText },
                  "text"
                );
              })
            );
          },
        }),
      }),
    });
  }, []);

  const [deleteMessageMutation] = useDeleteMessageMutation();
  const [editMessageMutation] = useEditMessageMutation();

  const handleDelete = async () => {
    const promp = prompt(
      "Are you really sure to delete this message ? If sure , then write 'yes' here ... "
    );
    if (!promp || promp !== "yes") return;
    deleteMessageMutation({ ...message, receiverId });
  };

  const handleEdit = async () => {
    const promp = prompt("", message.text);
    if (!promp || promp === message.text) return;
    editMessageMutation({ ...message, receiverId, msgText: promp });
  };

  const messageText = useRegex(regexUrl, message.text, []);

  return (
    <div
      className={`message-container ${
        currentUser?._id === message.sender ? "own" : ""
      }`}
    >
      <div className={`message`}>
        <div className="messageTop">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="messageImg"
            onClick={() => navigate(`/profile/${message.sender}`)}
          />
          <p className="messageText">{messageText}</p>
        </div>
        <div className="messageBottom">
          <small>{moment(message.createdAt).fromNow()}</small>
        </div>
      </div>
      {currentUser?._id === message.sender ? (
        <ActionsButtons
          classNames={{
            container: "message-action-buttons-container",
            actionButtonOptions: "message-action-button-options",
          }}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ) : null}
    </div>
  );
}

export default React.memo(Message);
