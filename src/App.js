import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { blackList, whiteList } from "./routes/index";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./store/auth/userSlice";
import { auth } from "./db/firebase";
import Header from "./components/Header/index";
import Navbar from "./components/Navbar/index";
import Section from "./styles/section";
import Main from "./styles/main";
import "antd/dist/antd.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            name: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  if (user) {
    return (
      <Router>
        <Switch>
          <Main>
            <Header />
            <Navbar />
            <Section>{whiteList}</Section>
          </Main>
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <Switch>{blackList}</Switch>
      </Router>
    );
  }
}

export default App;
