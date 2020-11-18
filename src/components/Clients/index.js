import React from "react";
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addContact.svg";
const index = () => {
  console.log("clients");
  return (
    <div className="customer">
      <div className="customer__top">
        <h2>Customers</h2>
        <Button>
          <Icon />
          <span>New Customer</span>
        </Button>
      </div>
    </div>
  );
};

export default index;
