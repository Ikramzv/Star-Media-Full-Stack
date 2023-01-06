import { Delete } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { END_LOADING, START_LOADING } from "../../actions/actionTypes";
import { registerUser } from "../../actions/userAction";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    city: "",
    from: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const changeImgToUrl = (file) => {
    dispatch({ type: START_LOADING });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      return setUserProfileImage(result);
    };
    dispatch({ type: END_LOADING });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (Object.entries(formData).find(([key, value]) => value === "")) {
      return alert("Fields mustn't be empty");
    }
    if (confirmPassword.substring(0) !== formData.password) {
      return alert("Confirmation password must be equal to original password");
    }

    if (formData.password.length < 8) {
      return setPasswordAlert("Password length must be 8 at least");
    }

    dispatch(
      registerUser(
        {
          ...formData,
          userProfileImage,
        },
        navigate
      )
    );
  };

  useEffect(() => {}, [formData, userProfileImage, passwordAlert]);

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Star Media</h3>
          <span className="registerDescription">
            Connect with friends and the world around you on Star Media.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <form>
              <fieldset>
                <legend>Star Media</legend>
                <div className="registerFormInputs">
                  <div className="registerFormInput">
                    <label htmlFor="username">Username :</label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Your username ..."
                      autoComplete="off"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="city">City :</label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Your city ..."
                      autoComplete="off"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="registerFormInput span_2">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email ..."
                      autoComplete="off"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="from">From :</label>
                    <input
                      type="text"
                      id="from"
                      placeholder="Where are you join us from ? "
                      autoComplete="off"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="pass">Password :</label>
                    <input
                      type="password"
                      id="pass"
                      placeholder="Your password..."
                      autoComplete="off"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {passwordAlert && (
                      <span
                        className={`${passwordAlert && "passwordAlert"}`}
                        onAnimationEnd={() => setPasswordAlert("")}
                      >
                        {passwordAlert}
                      </span>
                    )}
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="confirm">Confirm Password :</label>
                    <input
                      type="password"
                      id="confirm"
                      placeholder="Confirmation password..."
                      autoComplete="off"
                      name="confirmPassword"
                      value={confirmPassword}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="registerFormInput userProfileImg">
                    {userProfileImage ? (
                      <div className="userProfileImgContainer">
                        <img
                          src={userProfileImage}
                          alt=""
                          className="formUserProfileImage"
                        />
                        <Delete
                          className="userProfileImgDelete"
                          onTransitionEnd={() => setUserProfileImage("")}
                        />
                      </div>
                    ) : (
                      <>
                        <label htmlFor="profileImage">
                          Choose a profile image
                        </label>
                        <input
                          type="file"
                          id="profileImage"
                          name="userProfileImg"
                          accept="image/*"
                          onChange={(e) => changeImgToUrl(e.target.files[0])}
                        />
                      </>
                    )}
                  </div>
                </div>
                <input
                  type={"submit"}
                  value="REGISTER"
                  onClick={handleRegister}
                />
                <br />
                <span className="registerRegisterText">
                  Back to <b>login</b> :{" "}
                </span>
                <br />
                <button
                  className="backToLogin"
                  disabled={loading}
                  onClick={handleClick}
                >
                  Back
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
