import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/userAction";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      dispatch(loginUser(formData, navigate));
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {}, [formData]);

  return (
    <div className="login">
      {loading && <CircularProgress className="loading" />}
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Star Media</h3>
          <span className="loginDescription">
            Connect with friends and the world around you on Star Media.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form action="">
              <fieldset>
                <legend>Star Media</legend>
                <div className="loginFormInputs">
                  <div className="loginFormInput">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email ..."
                      autoComplete="off"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="loginFormInput">
                    <label htmlFor="pass">Password</label>
                    <input
                      type="password"
                      id="pass"
                      name="password"
                      placeholder="Your password"
                      autoComplete="off"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <input type={"submit"} value="LOGIN" onClick={handleSubmit} />
              </fieldset>
              <span className="loginRegisterText">
                Do you have account ? If not it is time to <b>register</b> :{" "}
              </span>
              <br />
              <button className="loginRegisterBtn" onClick={handleClick}>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
