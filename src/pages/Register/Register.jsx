import React from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };
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
            <form action="">
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
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="city">City :</label>
                    <input
                      type="text"
                      id="city"
                      placeholder="Your city ..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="email">Email :</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email ..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="pass">Password :</label>
                    <input
                      type="password"
                      id="pass"
                      placeholder="Your password..."
                      autoComplete="off"
                    />
                  </div>
                  <div className="registerFormInput">
                    <label htmlFor="confirm">Confirm Password :</label>
                    <input
                      type="password"
                      id="confirm"
                      placeholder="Confirmation password..."
                      autoComplete="off"
                    />
                  </div>
                </div>
                <input
                  type={"submit"}
                  value="REGISTER"
                  onClick={(e) => e.preventDefault()}
                />
                <br />
                <span className="registerRegisterText">
                  Back to <b>login</b> :{" "}
                </span>
                <br />
                <button className="backToLogin" onClick={handleClick}>
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
