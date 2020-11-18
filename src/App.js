import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { blackList, whiteList } from "./routes/index";
import Header from "./components/Header/index";
import Navbar from "./components/Navbar/index";
import Section from "./styles/section";
import Main from "./styles/main";
import "antd/dist/antd.css";
import "./App.css";

function App({ auth }) {
  const user = "jon";
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
