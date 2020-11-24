import React from "react";
import { Link, withRouter, NavLink } from "react-router-dom";
import { ReactComponent as ContractsIcon } from "../../assets/svg/contracts.svg";
import { ReactComponent as ClientsIcon } from "../../assets/svg/clients.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import {logOut} from '../../utils/auth'
// import { ReactComponent as UpIcon } from "../../assets/svg/up.svg";
// import { ReactComponent as DownIcon } from "../../assets/svg/down.svg";
import "./style.css";
const index = () => {
  const signOut = () => {
    logOut()
  }
  const URL = [
    {
      title: "Dashboard",
      path: "/",
      exact: true,
      icon: <HomeIcon size={24} className="header__icon" />,
    },
    {
      title: "Clients",
      path: "/clients",
      exact: true,
      icon: <ClientsIcon size={24} className="header__icon" />,
    },
    {
      title: "Contracts",
      path: "/contracts",
      exact: true,
      icon: <ContractsIcon size={24} className="header__icon" />,
    },
  ];
  // const linkHandler= ( e) => {
  //   console.log(e.target)
  // }
  return (
    <div className="header">
      <ul className="header__container">
        {URL.map((item) => (
          <li key={item.path} className="header__links">
            <NavLink to={item.path} exact={item.exact} activeClassName="active">
              <div>
                {item.icon}
                <span>{item.title}</span>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className='logOut'>
        <button onClick={signOut}>Log out</button>
      </div>
    </div>
  );
};

export default index;
