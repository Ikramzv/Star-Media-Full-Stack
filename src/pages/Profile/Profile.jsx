import React from "react";
import "./profile.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../../components/Feed/Feed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { followUserApi, getUser, unfollowUserApi } from "../../api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { Add, Remove } from "@mui/icons-material";

function Profile() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const followings = useSelector((state) => state.user.followings);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [followed, setFollowed] = useState(
    currentUser?.followings.includes(user?._id)
  );

  async function getUserForProfile() {
    const { data } = await getUser(id);
    setUser(data);
  }

  const followUser = async () => {
    if (!followings.some((id) => id === user?._id)) {
      dispatch({ type: "FOLLOW", payload: [...followings, user?._id] });
      await followUserApi(user?._id);
    } else {
      dispatch({ type: "UNFOLLOW", payload: user?._id });
      await unfollowUserApi(user?._id);
    }
  };

  const memoize = useMemo(() => {
    getUserForProfile();
    setFollowed(followings.includes(user?._id));
  }, [id, followings, followed]);

  useEffect(() => {
    setFollowed(currentUser?.followings.includes(user?._id));
    return memoize;
  }, []);

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
              <h5 className="profileInfoFollowers">
                {user?.followers?.length} Followers
              </h5>
              <h5 className="profileInfoFollowings">
                {user?.followings?.length} Followings
              </h5>
              {user?._id !== currentUser?._id && (
                <button
                  className="rightbarFollowBtn"
                  onClick={() => followUser()}
                >
                  {followed ? "Unfollow" : "Follow"}
                  <span>{followed ? <Remove /> : <Add />}</span>
                </button>
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userProfilePosts profileId={id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
