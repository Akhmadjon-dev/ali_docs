import React from "react";
import Button from "../../styles/button";
import { useHistory } from "react-router-dom";
import { ReactComponent as Icon } from "../../assets/svg/addContract.svg";
import "./style.css";
const Index = () => {
  const history = useHistory();
  const addHandler = () => {
    history.push("/contracts-add");
  };
  return (
    <div className="contract">
      <div className="contract__top">
        <h2>Contracts</h2>
        <Button onClick={addHandler}>
          <Icon />
          <span>New Contract</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
