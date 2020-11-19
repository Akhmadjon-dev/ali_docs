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
  const [projectName, setProjectName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [clientid, setClientid] = useState("");
  const [contractNumber, setContractNumber] = useState(0);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const inputHandler = (e) => {
    console.log(e.target, e.target.name, "input handler");
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
            <Input onChange={inputHandler} placeholder="Project name" />
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
            <Select
              placeholder="Choose a client"
              // onChange={}
              allowClear
            >
              <Option value="jhon">Jhon</Option>
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date">
            <RangePicker
              defaultValue={[
                moment("2015/01/01", dateFormat),
                moment("2015/01/01", dateFormat),
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
            <InputNumber
              min={0}
              defaultValue={3}
              // onChange={onChange}
            />
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
              // onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="requiredPay"
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
              // onChange={onChange}
            />
          </Form.Item>
          <Form.Item label="Total">
            <p style={{ margin: "0" }}>0$</p>
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
