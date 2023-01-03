import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Conversation from "../Conversations/Conversation";
import SearchedFriends from "./SearchedFriends";

function SidebarForMessenger({
  currentChat,
  setCurrentChat,
  followings,
  setBar,
}) {
  const [searchedFriend, setSearchFriend] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState(true);
  const [conversations, setConversations] = useState([]);
  const { conversation } = useSelector((state) => state.conversation);
  useEffect(() => {
    if (value.length === 0) {
      setSearchFriend([]);
      setDisplay(true);
    }
  }, [value]);
  const handleChange = (e) => {
    // Take a value from input and create list based on friends username
    if (value.length === 0) {
      setSearchFriend([]);
    }
    setValue(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const searched = [...followings].filter(
      (friend) => friend?.username?.toLowerCase().indexOf(searchTerm) > -1
    );

    // If searched array is greater than 0 assign the list to searchedFriend and display Conversation component otherwise
    // display followings array which is coming from database
    setSearchFriend(searched);
  };

  useEffect(() => {
    if (!display) {
      setValue("");
    }
  }, [display]);

  useEffect(() => {
    console.log("conversation", conversation);
    setConversations(conversation);
  }, [conversation]);

  return (
    <div>
      <input
        placeholder="Search for friends to message.."
        type={"text"}
        className="chatFriendInput"
        value={value}
        onChange={handleChange}
      />
      <ul className="conversationList">
        {conversations?.map((c) => (
          <Conversation
            key={c._id}
            conversation={c}
            setCurrentChat={setCurrentChat}
            setBar={setBar}
            currentChat={currentChat}
          />
        ))}
        {display && searchedFriend.length > 0 && (
          <div className="searchedFriendList">
            <h4 style={{ margin: "5px 0 0 10px" }}>Searched ...</h4>
            {searchedFriend?.map((friend) => (
              <SearchedFriends
                key={friend._id}
                friend={friend}
                setDisplay={setDisplay}
                setCurrentChat={setCurrentChat}
                conversations={conversations}
                setConversations={setConversations}
                setBar={setBar}
              />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default React.memo(SidebarForMessenger);
