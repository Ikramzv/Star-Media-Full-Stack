import React from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  return (
    <div className="login">
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
                      placeholder="Your email ..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="loginFormInput">
                    <label htmlFor="pass">Password</label>
                    <input
                      type="password"
                      id="pass"
                      placeholder="Your password"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <input
                  type={"submit"}
                  value="LOGIN"
                  onClick={(e) => e.preventDefault()}
                />
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
