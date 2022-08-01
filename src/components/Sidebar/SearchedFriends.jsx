import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createConversationAction } from "../../actions/conversationActions";

function SearchedFriends({
  friend,
  setDisplay,
  setCurrentChat,
  setConversations,
  conversations,
  setBar,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    setBar("close");
    setDisplay(false); // for hiding the list
    const memberIds = [];
    // By iterating ove all covnersations' members push members ids to array . Then
    // if array includes friend id set currentChat to existing conversation
    // if array not includes friend id create new conversation at this time
    conversations.map((c) => c?.members.map((m) => memberIds.push(m)));

    if (memberIds.some((memberId) => memberId === friend?._id)) {
      let existingConv = {};
      conversations.map((c) => {
        if (c?.members.some((id) => id === friend?._id)) {
          return (existingConv = c);
        }
      });

      setCurrentChat(existingConv);
      navigate(`/messenger/${existingConv?._id}`);
    } else {
      return dispatch(
        createConversationAction(
          friend?._id,
          setCurrentChat,
          setConversations,
          conversations
        )
      );
    }
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
