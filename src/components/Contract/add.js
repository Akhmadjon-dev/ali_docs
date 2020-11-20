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

import { Link } from "react-router-dom";

import "./style.css";

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

const Add = () => {
  const [debt, setDebt] = useState(0);
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
    console.log("debt", debt);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
            label="Project name"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Please input project name!",
              },
            ]}
          >
            <Input placeholder="Project name" />
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Choose a client" allowClear>
              <Option value="jhon">Jhon</Option>
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date">
            <RangePicker
              defaultValue={[
                moment(moment(), dateFormat),
                moment(moment(), dateFormat),
              ]}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            name="contractNumber"
            label="Contract Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Card style={{ marginBottom: "15px" }}>
            <h2>Services</h2>
            <p>Describe and price the services you’ll be delivering</p>
          </Card>
          <Form.Item
            label="Service name"
            name="serviceName"
            rules={[
              {
                required: true,
                message: "Please input service name",
              },
            ]}
          >
            <Input placeholder="Project name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              min={0}
              defaultValue={3}
              onChange={(e) => setPrice(e)}
            />
          </Form.Item>
          <Form.Item
            name="reqPayment"
            label="Required pay"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              defaultValue={100}
              min={0}
              max={30}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
              onChange={(e) => setReqPayment(e)}
            />
          </Form.Item>
          <Form.Item name="debt" label="Debt">
            <p style={{ margin: "0" }}>{debt}</p>
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

export default Add;
