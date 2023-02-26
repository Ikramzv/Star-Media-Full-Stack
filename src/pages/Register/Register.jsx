import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectMutation } from "../../api/utils";
import Buttons from "../../common/Buttons";
import { setUser } from "../../slices/userReducer";
import "./register.css";
import UserImage from "./UserImage";

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
  const [userCoverImage, setUserCoverImage] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { useRegisterMutation } = useMemo(() => {
    return injectMutation(
      (body) => ({
        body,
        method: "POST",
        url: "/auth/register",
      }),
      "register"
    );
  }, []);

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const changeImgToUrl = (file, setImage) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      return setImage(result);
    };
  };

  const handleRegister = async (e) => {
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
    const body = {
      ...formData,
      userProfileImage,
      userCoverImage,
    };
    try {
      const data = await register(body).unwrap();
      dispatch(setUser(data));
      navigate("/");
    } catch (error) {
      navigate("/register");
    }
  };

  const images = useMemo(
    () => (
      <>
        <UserImage
          changeImgToUrl={changeImgToUrl}
          setImage={setUserProfileImage}
          userImage={userProfileImage}
          text={"profile"}
          name={"userProfileImage"}
          id={"profileImage"}
        />
        <UserImage
          changeImgToUrl={changeImgToUrl}
          setImage={setUserCoverImage}
          userImage={userCoverImage}
          text={"cover"}
          name={"userCoverImage"}
          id={"coverImage"}
        />
      </>
    ),
    [userProfileImage, userCoverImage]
  );

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
                  <div className="registerFormInput span_2">
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
                  {images}
                </div>
                <Buttons
                  classname={""}
                  isLoading={isLoading}
                  handleClick={handleRegister}
                  text="Register"
                  type={"submit"}
                />
                <br />
                <span className="registerRegisterText">
                  Back to <b>login</b> :{" "}
                </span>
                <br />
                <Buttons
                  classname={"backToLogin"}
                  isLoading={isLoading}
                  handleClick={handleClick}
                  text="Back"
                  type={"button"}
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
