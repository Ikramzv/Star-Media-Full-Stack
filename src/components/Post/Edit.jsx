import { Edit as EditIcon } from "@mui/icons-material";
import React from "react";
import { useDispatch } from "react-redux";
import { updatePostAction } from "../../actions/postAction";

function Edit({ postId, postDescription }) {
  const dispatch = useDispatch();
  const editPost = () => {
    const promp = prompt("", postDescription);
    if (promp === postDescription) return;
    dispatch(updatePostAction(postId, promp));
  };
  return (
    <button className="postEditBtn postBtn" onClick={editPost}>
      Edit <EditIcon fontSize={"small"} />
    </button>
  );
}

export default Edit;
