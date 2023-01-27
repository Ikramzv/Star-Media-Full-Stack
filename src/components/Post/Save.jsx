import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import React, { useState } from "react";

function Save({ post, user }) {
  const [save, setSave] = useState([]);
  function handleClick() {
    if (!save.includes(post._id)) setSave([...save, post._id]);
    else setSave(save.filter((p) => p !== post._id));
  }
  return (
    <div className="save_button" onClick={handleClick}>
      {save.includes(post._id) ? <Bookmark /> : <BookmarkAddOutlined />}
    </div>
  );
}

export default Save;
