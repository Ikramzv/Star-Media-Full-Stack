import React, { useEffect, useState } from "react";
import { getFollowings } from "../../api";
import Following from "./Followings/Following";

const ProfileRightbar = ({ profileUser }) => {
  const [friends, setFriends] = useState([]);

  async function getFollowingsUser() {
    if (profileUser?.followings?.length > 0) {
      const { data } = await getFollowings(profileUser?._id);
      setFriends(data.followings);
      return data;
    }
  }
  useEffect(() => {
    if (profileUser?._id) {
      getFollowingsUser();
    }
  }, [profileUser?._id]);
  return (
    <>
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{profileUser?.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{profileUser?.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
            {profileUser?.relationship === "1"
              ? "Single"
              : profileUser?.relationship === "2"
              ? "Married"
              : "-"}
          </span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Following user={friend} key={friend?._id} />
        ))}
      </div>
    </>
  );
};

export default React.memo(ProfileRightbar);
