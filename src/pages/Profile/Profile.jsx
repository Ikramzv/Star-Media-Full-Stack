import { Add, Remove } from "@mui/icons-material";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  api,
  followUserApi,
  injectEndpoints,
  unfollowUserApi,
} from "../../api";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./profile.css";

function Profile() {
  const { id } = useParams();
  const { useGetUserQuery } = useMemo(() => {
    return injectEndpoints({
      endpoints: (builder) => ({
        getUser: builder.query({
          query: (id) => `/users/${id}`,
        }),
      }),
    });
  }, [id]);

  const { data: user } = useGetUserQuery(id);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isFollows = useMemo(
    () => user?.followers?.includes(currentUser._id),
    [user?.followers?.length]
  );

  const followUser = async () => {
    if (!user?.followers.some((id) => id === currentUser?._id)) {
      dispatch(
        api.util.updateQueryData("getUser", id, (user) => {
          return {
            ...user,
            followers: [...user.followers, currentUser?._id],
          };
        })
      );
      await followUserApi(user?._id);
    } else {
      dispatch(
        api.util.updateQueryData("getUser", id, (user) => {
          return {
            ...user,
            followers: user?.followers.filter((id) => id !== currentUser?._id),
          };
        })
      );
      await unfollowUserApi(user?._id);
    }
  };

  return (
    <>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user?.userCoverImage ? user?.userCoverImage : "/user.webp"}
                alt=""
                className="coverImg"
              />
              <img
                src={
                  user?.userProfileImage ? user?.userProfileImage : "/user.webp"
                }
                alt=""
                className="userImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <div className="profileInfoStatistics">
                <h5 className="profileInfoFollowers">
                  {user?.followers?.length} Followers
                </h5>
                <h5 className="profileInfoFollowings">
                  {user?.followings?.length} Followings
                </h5>
              </div>
              {user?._id !== currentUser?._id && (
                <button
                  className="rightbarFollowBtn"
                  onClick={() => followUser()}
                >
                  {isFollows ? "Unfollow" : "Follow"}
                  <span>{isFollows ? <Remove /> : <Add />}</span>
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed profileId={id} profileUser={user} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
