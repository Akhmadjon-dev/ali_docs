import React from "react";
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addClients.svg";
import "./style.css";
const index = () => {
  console.log("clients");
  return (
    <div className="clients">
      <div className="clients__top">
        <h2>Clients</h2>
        <Button>
          <Icon />
          <span>New Clients</span>
        </Button>
      </div>
    </div>
  );
};

export default index;
