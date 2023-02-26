import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import Online from "../Online/Online";

const HomeRightbar = ({ setBar }) => {
  const onlineFriends = useSelector(
    (state) => state.onlineFriends,
    shallowEqual
  );

  return (
    <>
      <h4 className="rightbarTitle">Online friends</h4>
      <ul className="rightbarFriendList">
        {onlineFriends?.length > 1 ? (
          onlineFriends.map((online, i) => (
            <Online onlineFriend={online} key={i} setBar={setBar} />
          ))
        ) : (
          <div>
            <p style={{ fontSize: "14px", color: "gray" }}>
              No one is online for now ..
            </p>
          </div>
        )}
      </ul>
    </>
  );
};

export default React.memo(HomeRightbar);
