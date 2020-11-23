import React, { useState } from "react";
import {
  Form,
  Input,
  Card,
  Button,
  DatePicker,
  Space,
  Select,
  InputNumber,
} from "antd";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

// import "./style.css";
import { createClient } from "../../utils/client";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const { Option } = Select;

// add to fireabse

const AddClient = () => {
  const [price, setPrice] = useState(0);
  const [reqPayment, setReqPayment] = useState(0);
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("project", values["projectName"]);
    console.log("service", values["serviceName"]);
    console.log("client", values["client"]);
    console.log("contract", values["contractNumber"]);
    console.log("start", moment(values["startDate"]).valueOf());
    console.log("end", moment(values["endDate"]).valueOf());
    console.log("price", values["price"]);
    console.log("req", values["reqPayment"]);

     createClient()
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="add">
      <div className="add__top">
        <div className="add__navLinks">
          <Link className="add__firstStep" to="/clients">
            Clients
          </Link>{" "}
          {" / "}
          <Link className="add__firstStep add__secondStep" to="/clients-add">
            Create Client
          </Link>
        </div>
        <h2 className="add__title">Create Client</h2>
      </div>
      <div className="add__main">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Client name"
            name="ClientName"
            rules={[
              {
                required: true,
                message: "Please input Client name!",
              },
            ]}
          >
            <Input placeholder="Client name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Client phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={7} />
          </Form.Item>
          <Form.Item
            name="email"
            label="Client email"
            rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="PostCode"
            label="Post code"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          {/* <Card style={{ marginBottom: "15px" }}>
            <h2>Services</h2>
            <p>Describe and price the services you’ll be delivering</p>
          </Card> */}
          <Form.Item
            label="Company name"
            name="CompanyName"
            rules={[
              {
                required: true,
                message: "Please input Company name",
              },
            ]}
          >
            <Input placeholder="Company name" />
          </Form.Item>
          <Space align="end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Cancel</Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default AddClient;