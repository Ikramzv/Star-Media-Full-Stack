import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addConversation } from "../../slices/conversationSlice";

function SearchedFriends({
  friend,
  setValue,
  setBar,
  createConversationMutation,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const conversations = useSelector((state) => state.conversations);

  const handleClick = async () => {
    setBar("close");
    setValue("");
    const memberSet = new Set();

    conversations.forEach((c) => c?.members.map((m) => memberSet.add(m)));

    if (memberSet.has(friend?._id)) {
      for (let conversation of conversations) {
        if (conversation?.members.some((id) => id === friend?._id)) {
          return navigate(`/messenger/${conversation?._id}`);
        }
      }
    }

    const { data } = await createConversationMutation(friend?._id);
    dispatch(addConversation(data));
    navigate(`/messenger/${data?._id}`);
    return;
  };

  return (
    <div
      className="searchedListItem"
      onClick={handleClick}
      style={{ marginInline: "10px" }}
    >
      <img
        src={friend?.userProfileImage ? friend?.userProfileImage : "/user.webp"}
        alt="user"
        className="searchedListItemImg"
      />
      <strong>{friend?.username}</strong>
    </div>
  );
}

export default SearchedFriends;
