import React from "react";
import { useSelector } from "react-redux";

function NotFound({ incomingData, setShownPosts, shownPosts, profileUser }) {
  const { posts, currentUser } = useSelector((state) => ({
    posts: state.posts.posts,
    currentUser: state.user.user,
  }));
  const handleClick = (e) => {
    setShownPosts("additionalPosts");
  };

  if (profileUser?._id) {
    return !posts.length ? (
      profileUser?._id !== currentUser?._id ? (
        <div className="additional">
          <h4>{profileUser.username}</h4>
          <p>hasn't already shared post yet !</p>
        </div>
      ) : (
        <div className="additional">
          <h4>{currentUser?.username}</h4>
          <p>You haven't already shared post yet !</p>
          <h4>
            There are no posts , anyway. Maybe do you want to share a post ?{" "}
          </h4>
        </div>
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
      ) : incomingData[shownPosts].length < 5 ? (
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
