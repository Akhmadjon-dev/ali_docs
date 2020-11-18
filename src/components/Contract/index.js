import React from "react";
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addContract.svg";
import "./style.css";
const index = () => {
  return (
    <div className="contract">
      <div className="contract__top">
        <h2>Contracts</h2>
        <Button>
          <Icon />
          <span>New Contract</span>
        </Button>
      </div>
    </div>
  );
};

export default index;
