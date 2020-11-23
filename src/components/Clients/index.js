import React from "react";
import { useHistory } from 'react-router-dom'
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addClients.svg";
import "./style.css";
const Index = () => {
  const history = useHistory();
  const addHandler = () => {
    history.push("/clients-add");
  };
  return (
    <div className="clients">
      <div className="clients__top">
        <h2>Clients</h2>
        <Button onClick={addHandler}>
          <Icon />
          <span>New Clients</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
