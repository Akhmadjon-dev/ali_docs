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
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [reqPayment, setReqPayment] = useState(0);
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log("project", values["projectName"]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(
    projectName,
    reqPayment,
    contractNumber,
    clientid,
    endDate,
    startDate
  );
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
            <Input
              defaultValue={projectName}
              // onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project name"
            />
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
              onChange={(e) => setClientid(e)}
              allowClear
            >
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
              onChange={(e) => {
                setEndDate(moment(e[0]).valueOf());
                setStartDate(moment(e[1]).valueOf());
              }}
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
              defaultValue={contractNumber}
              onChange={(e) => setContractNumber(e)}
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
            <Input
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Project name"
            />
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
              onChange={(e) => setReqPayment(e)}
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
