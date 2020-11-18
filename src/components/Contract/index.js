import React from "react";
import Button from "../../styles/button";
import { ReactComponents as Icon } from "../../assets/svg/addCustomers.svg";
const index = () => {
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
