import {
  Delete,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { END_LOADING, START_LOADING } from "../../actions/actionTypes";
import { createUserPost } from "../../actions/postAction";
import "./share.css";

const regexpUrl =
  /(http|https):\/\/(www?(\.))?[A-z\d]{1,}\.(com|az|ru|org|co|net|tr|us)(\/[A-z\d\S]{1,})?/gi; // url

function Share() {
  const user = useSelector((state) => state.user.user);
  const [desc, setDesc] = useState([]);
  const [media, setMedia] = useState("");
  const dispatch = useDispatch();
  const { id: profileId } = useParams();

  const handleChange = (e) => {
    setDesc(e.target.value);
  };

  const element = useRef();
  const input = useRef(
    <input
      key={crypto.randomUUID()}
      type={"file"}
      id="postImageInput"
      style={{ display: "none" }}
      onChange={(e) => {
        console.log(e);
        imageToUrl(e.target.files[0]);
      }}
    />
  );

  const recreateInput = () => {
    const props = input.current.props;
    const newInput = React.createElement(input.current.type, {
      key: crypto.randomUUID(),
      ...props,
    });
    input.current = newInput;
  };

  const resetImage = (e) => {
    e.preventDefault();
    recreateInput();
    setMedia("");
  };

  const imageToUrl = (file) => {
    dispatch({ type: START_LOADING });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.result, file);
    reader.onloadend = () => {
      const src = reader.result;
      if (file.type.includes("video")) {
        element.current = (
          <>
            <video src={src} loop autoPlay controls alt="video" />
            <button onClick={resetImage} className="postImageDelete">
              <Delete />
            </button>
          </>
        );
      } else {
        element.current = (
          <>
            <img src={src} alt="image" />
            <button onClick={resetImage} className="postImageDelete">
              <Delete />
            </button>
          </>
        );
      }
      setMedia(src);
      dispatch({ type: END_LOADING });
    };
  };

  const createPost = (e) => {
    e.preventDefault();
    if (desc.length > 0) {
      dispatch(
        createUserPost(
          {
            desc,
            img: media,
          },
          user
        )
      );
      setMedia("");
      setDesc("");
    } else {
      return alert("Description must be 1 character at least");
    }
  };

  if (profileId && profileId !== user?._id) return null;

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
              {input.current}
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
          {media && <div className="shareImage">{element.current}</div>}
          <button className="shareBtn" type={"submit"}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
