import { message, Divider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../../db/firebase";
import "./style.css";
const Login = () => {
  const authHandler = () => {
    auth.signInWithPopup(provider).catch((err) => message(err.message));
  };
  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="card">
            <div className="card-container">
              <h1 className="heading">LOGIN</h1>
              <form action="#">
                <input
                  type="text"
                  //   value=""
                  name="username"
                  placeholder="Username"
                  required
                />
                <input
                  type="password"
                  //   value=""
                  name="password"
                  placeholder="Password"
                  required
                />
                <Link to="#" className="btn">
                  <i className="zmdi zmdi-arrow-right"></i>
                </Link>
              </form>
              <Link to="#" className="forgot">
                Forgot Password?
              </Link>
            </div>
            <Divider onClick={authHandler} style={{ cursor: "pointer" }}>
              Sign In With Google?
            </Divider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
