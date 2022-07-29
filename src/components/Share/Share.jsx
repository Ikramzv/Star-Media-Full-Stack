import React, { useEffect } from "react";
import "./share.css";
import {
  Delete,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createUserPost } from "../../actions/postAction";
import { CircularProgress } from "@mui/material";

function Share() {
  const user = useSelector((state) => state.user.user);
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);

  const imageToUrl = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const createPost = (e) => {
    e.preventDefault();
    if (desc.length > 5) {
      dispatch(
        createUserPost({
          desc,
          img: image,
        })
      );
      setImage("");
      setDesc("");
    } else {
      return alert("Description must be 5 letter at least");
    }
  };

  return (
    <div className="share">
      {loading && <CircularProgress className="loading" />}
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user?.userProfileImage ? user?.userProfileImage : "/user.webp"}
            alt=""
            className="shareTopImg"
          />
          <textarea
            type={"text"}
            placeholder={`What's up , ${user?.username}?`}
            className="shareInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={createPost}>
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="crimson" className="shareIcon" />
              <label className="shareOptionText" htmlFor="postImageInput">
                Photo or Video
              </label>
              <input
                type={"file"}
                id="postImageInput"
                style={{ display: "none" }}
                onChange={(e) => imageToUrl(e.target.files[0])}
              />
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="darkgreen" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="orangered" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          {image && (
            <div className="shareImage">
              <img src={image} alt="" />
              <Delete
                className="postImageDelete"
                onTransitionEnd={() => setImage("")}
              />
            </div>
          )}
          <button className="shareBtn" type={"submit"}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
