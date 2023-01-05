import {
  Delete,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserPost } from "../../actions/postAction";
import "./share.css";

const regexpUrl =
  /(http|https):\/\/(www?(\.))?[A-z\d]{1,}\.(com|az|ru|org|co|net|tr|us)(\/[A-z\d\S]{1,})?/gi; // url

function Share() {
  const user = useSelector((state) => state.user.user);
  const [desc, setDesc] = useState([]);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const imageToUrl = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const createPost = (e) => {
    e.preventDefault();
    if (desc.length > 0) {
      dispatch(
        createUserPost(
          {
            desc,
            img: image,
          },
          user
        )
      );
      setImage("");
      setDesc("");
    } else {
      return alert("Description must be 1 character at least");
    }
  };

  return (
    <div className="share">
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
            onChange={handleChange}
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
