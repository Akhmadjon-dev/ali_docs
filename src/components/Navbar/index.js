import React from "react";
import Logo from "../../assets/img/log.png";
import { ReactComponent as RingIcon } from "../../assets/svg/bell.svg";
import { Select } from "antd";

import "./style.css";
const { Option } = Select;
const index = () => {
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar__links">
        <span className="header__bellNum">45</span>
        <RingIcon className="navbar__icon" />
        <Select defaultValue="Uz" style={{ width: 60 }} onChange={handleChange}>
          <Option value="uz">Uz</Option>
          <Option value="ru">Ru</Option>
        </Select>
      </div>
    </div>
  );
};

export default index;
