import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Add = () => {
  return (
    <div className="add">
      <div className="add__top">
        <div className="add__navLinks">
          <Link className="add__firstStep" to="/contracts">
            Contracts
          </Link>{" "}
          {" / "}
          <Link className="add__firstStep add__secondStep" to="/contracts-add">
            Create Contract
          </Link>
        </div>
        <h2 className="add__title">Create Contract</h2>
      </div>
    </div>
  );
};

export default Add;
