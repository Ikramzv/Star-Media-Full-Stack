import React from "react";
import { shallowEqual, useSelector } from "react-redux";

function NotFound({ incomingData, setPostType, postType, profileUser, posts }) {
  const user = useSelector((state) => state.user, shallowEqual);
  const handleClick = (e) => {
    setPostType("additionalPosts");
  };

  if (profileUser?._id) {
    return !incomingData.mainPosts.length < 5 ? (
      !posts.length ? (
        profileUser?._id !== user?._id ? (
          <div className="additional">
            <h4>{profileUser.username}</h4>
            <p>hasn't already shared post yet !</p>
          </div>
        ) : (
          <div className="additional">
            <h4>{user?.username}</h4>
            <p>You haven't already shared post yet !</p>
            <h4>
              There are no posts , anyway. Maybe do you want to share a post ?{" "}
            </h4>
          </div>
        )
      ) : (
        (posts.length % 5 > 0 || incomingData.mainPosts.length < 5) && (
          <div className="additional">
            <button
              onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
            >
              Go to top
            </button>
          </div>
        )
      )
    ) : null;
  }

  return (
    <>
      {Object.values(incomingData).every((array) => array.length < 5) ? (
        <div className="additional">
          <h4>
            There are no posts , anyway. Maybe do you want to share a post ?{" "}
          </h4>
          <button
            onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
          >
            Go to top
          </button>
        </div>
      ) : incomingData[postType].length < 5 ? (
        <div className="additional">
          {!posts.length ? (
            <>
              <h4>Your friends didn't share a post yet</h4>
              <p>You can click to see the posts that others shared</p>
            </>
          ) : (
            <>
              <h4>You are all caught up</h4>
              <p>You've seen all your friends posts</p>
            </>
          )}
          <button onClick={handleClick}>See other posts</button>
        </div>
      ) : null}
    </>
  );
}

export default React.memo(NotFound);
