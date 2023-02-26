import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { injectEndpoints } from "../../api";
import Conversation from "../Conversations/Conversation";
import SearchedFriends from "./SearchedFriends";

function SidebarForMessenger({ followings, setBar }) {
  const [searchedFriend, setSearchFriend] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisplay] = useState(true);
  const dispatch = useDispatch();

  const { useGetConversationsQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getConversations: builder.query({
          query: () => `/conversations`,
        }),
      }),
    });
  }, []);

  const { data: conversations, isLoading } = useGetConversationsQuery();

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

  const conversationMemo = useMemo(() => {
    return conversations?.map((c) => (
      <Conversation key={c._id} conversation={c} setBar={setBar} />
    ));
  }, [conversations?.length]);

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
        {isLoading ? (
          <CircularProgress
            style={{ margin: "auto", display: "block" }}
            color="error"
          />
        ) : (
          conversationMemo
        )}
        {searchedFriend.length > 0 && (
          <div className={`searchedFriendList ${display ? "active" : ""}`}>
            <h4 style={{ margin: "5px 0 0 10px" }}>Searched ...</h4>
            {searchedFriend?.map((friend) => (
              <SearchedFriends
                key={friend._id}
                friend={friend}
                setDisplay={setDisplay}
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
