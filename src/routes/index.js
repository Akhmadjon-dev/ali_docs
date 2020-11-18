import { Redirect, Route, Router } from "react-router-dom";
import Login from "../components/Auth/login";
import Clients from "../components/Clients/index";
import Contracts from "../components/Contract/index";
export const whiteList = [
  <Route key="dashboar" path="/" component="" exact />,
  <Route key="clients" path="/clients" component={Clients} exact />,
  <Route key="contracts" path="/contracts" component={Contracts} exact />,
  <Redirect key="defaultPaht" to="/sign-in" />,
];
export const blackList = [
  <Route key="signin" path="/sign-in" component={Login} exact />,
  //   <Route key="signin" path="/sign-in" component={Login} exact />,
  <Redirect key="defaultPaht" to="/sign-in" />,
];
