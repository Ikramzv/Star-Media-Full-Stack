import CircularProgress from "@mui/material/CircularProgress";
import React, { useMemo } from "react";
import { injectEndpoints } from "../../api";
import Following from "./Followings/Following";

const ProfileRightbar = ({ profileUser, setBar }) => {
  const { useGetFollowingsQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getFollowings: builder.query({
          query: (id) => ({
            url: `/users/followings/${id}`,
          }),
          transformResponse: (res) => res.followings,
        }),
      }),
    });
  }, [profileUser?._id]);

  const { data: friends, isLoading } = useGetFollowingsQuery(profileUser?._id);

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
        {!isLoading ? (
          friends.map((friend) => (
            <Following user={friend} key={friend?._id} setBar={setBar} />
          ))
        ) : (
          <CircularProgress style={{ margin: "auto" }} color="error" />
        )}
      </div>
    </>
  );
};

export default React.memo(ProfileRightbar);
