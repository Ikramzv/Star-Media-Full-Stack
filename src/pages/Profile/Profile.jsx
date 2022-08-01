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
import { Add, Remove } from "@mui/icons-material";

function Profile() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const [followed, setFollowed] = useState(Boolean);
  const [userFollowers, setUserFollowers] = useState([]);

  async function getUserForProfile() {
    const { data } = await getUser(id);
    setUserFollowers(data?.followers);
    setUser(data);
  }

  const followUser = async () => {
    if (!userFollowers.some((id) => id === currentUser?._id)) {
      setUserFollowers([...userFollowers, currentUser?._id]);
      setFollowed(true);
      await followUserApi(user?._id);
    } else {
      setUserFollowers(userFollowers.filter((id) => id !== currentUser?._id));
      setFollowed(false);
      await unfollowUserApi(user?._id);
    }
  };

  useEffect(() => {
    getUserForProfile();
    setFollowed(userFollowers.includes(currentUser?._id));
  }, [id]);

  useEffect(() => {
    setFollowed(userFollowers.includes(currentUser?._id));
  }, [user]);

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
                  {userFollowers.length} Followers
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
