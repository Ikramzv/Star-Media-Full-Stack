import { Delete } from "@mui/icons-material";
import React from "react";

function UserImage({ userImage, setImage, changeImgToUrl, text, name, id }) {
  return (
    <div className="registerFormInput userProfileImg">
      {userImage ? (
        <div className="userProfileImgContainer">
          <img src={userImage} alt="" className="formUserProfileImage" />
          <Delete
            className="userProfileImgDelete"
            onTransitionEnd={() => setImage("")}
          />
        </div>
      ) : (
        <>
          <label htmlFor={id}>Choose a {text} image</label>
          <input
            type="file"
            id={id}
            name={name}
            accept="image/*"
            onChange={(e) => changeImgToUrl(e.target.files[0], setImage)}
          />
        </>
      )}
    </div>
  );
}

export default React.memo(UserImage);
