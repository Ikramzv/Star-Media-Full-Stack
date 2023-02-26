import { CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { injectEndpoints } from "../../api";
import { setConversations } from "../../slices/conversationSlice";
import Conversation from "../Conversations/Conversation";
import SearchedFriends from "./SearchedFriends";

function SidebarForMessenger({ followings, setBar }) {
  const [searchedFriend, setSearchFriend] = useState([]);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const { useCreateConversationMutation, useLazyGetConversationsQuery } =
    useMemo(() => {
      return injectEndpoints({
        endpoints: (builder) => ({
          getConversations: builder.query({
            query: () => `/conversations`,
          }),
          createConversation: builder.mutation({
            query: (receiverId) => ({
              url: `/conversations/${receiverId}`, // receiverId is a person that you want to take a conversation
              method: "POST",
            }),
          }),
        }),
      });
    }, []);

  const [getConversations, { data: conversations, isLoading }] =
    useLazyGetConversationsQuery();
  const [createConversationMutation] = useCreateConversationMutation();

  const handleChange = (e) => {
    // Take a value from input and create list based on friends username
    const targetValue = e.target.value;
    setValue(targetValue);
    if (targetValue.length === 0) {
      setSearchFriend([]);
      return;
    }
    const searchTerm = targetValue.toLowerCase();
    const searched = followings.filter(
      (friend) => friend?.username?.toLowerCase().indexOf(searchTerm) > -1
    );

    // If searched array is greater than 0 assign the list to searchedFriend and display Conversation component otherwise
    // display followings array which is coming from database
    setSearchFriend(searched);
  };

  useEffect(() => {
    getConversations().then(({ data }) => dispatch(setConversations(data)));
  }, []);

  const conversationMemo = useMemo(() => {
    return conversations?.map((c) => (
      <Conversation key={c._id} conversation={c} setBar={setBar} />
    ));
  }, [conversations?.length]);

  return (
    <div className="messenger-sidebar-container">
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
          <div className={`searchedFriendList ${value.length ? "active" : ""}`}>
            <h4 style={{ margin: "5px 0 0 10px" }}>Searched ...</h4>
            {searchedFriend?.map((friend) => (
              <SearchedFriends
                key={friend._id}
                friend={friend}
                setValue={setValue}
                setBar={setBar}
                createConversationMutation={createConversationMutation}
              />
            ))}
          </div>
        )}
      </ul>
    </div>
  );
}

export default React.memo(SidebarForMessenger);
