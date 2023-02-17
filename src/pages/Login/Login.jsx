import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { injectMutation } from "../../api/utils";
import Buttons from "../../common/Buttons";
import { setUser } from "../../reducers/userReducer";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { useLoginMutation } = useMemo(() => {
    return injectMutation(
      (body) => ({
        body,
        url: "/auth/login",
        method: "POST",
      }),
      "login"
    );
  }, []);
  const [login, { isLoading }] = useLoginMutation({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every((v) => v.length)) {
      try {
        const data = await login(formData).unwrap();
        dispatch(setUser(data));
        navigate("/");
      } catch (error) {
        Promise.reject(error);
        alert(error.data);
      }
    } else alert("Empty fields");
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

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
                <Buttons
                  classname={""}
                  handleClick={handleSubmit}
                  isLoading={isLoading}
                  text={"Login"}
                  type="submit"
                />
              </fieldset>
              <span className="loginRegisterText">
                Do you have account ? If not it is time to <b>register</b> :{" "}
              </span>
              <br />
              <Buttons
                classname={"loginRegisterBtn"}
                handleClick={handleClick}
                isLoading={isLoading}
                text={"Register"}
                type="button"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
