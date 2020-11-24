import { message, Divider} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, provider } from "../../db/firebase";
import {SignIn} from '../../utils/auth'
import "./style.css";
const Login = () => {
  const authHandler = () => {
    auth.signInWithPopup(provider).catch((err) => message(err.message));
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  const logIn = async (e) => {
    e.preventDefault();
    const {msg} = await SignIn(email, password);
   if(msg.startsWith('Muvaf')){
    message.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
   }else{
    message.warning("Email yoki parol noto'g'ri kiritildi!");
   }
  }
  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="card">
            <div className="card-container">
              <h1 className="heading">LOGIN</h1>
              <form onSubmit={logIn}>
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  name="useremail"
                  placeholder="User Email"
                  required
                />
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  required
                />
                <button type='submit' className="btn">
                  <i className="zmdi zmdi-arrow-right"></i>
                </button>
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
