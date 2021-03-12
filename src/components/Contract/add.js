import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Card,
  Button,
  DatePicker,
  Space,
  Select,
  InputNumber,
  message,
} from "antd";
import moment from "moment";
import {createContract} from '../../utils/contract'
import {getAllClients} from '../../utils/client'
import { v4 as uuidv4 } from "uuid";
import { Link, useHistory } from "react-router-dom";

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

// add to fireabse

const Add = () => {
  const [debt, setDebt] = useState(0);
  const [clients, setClients] = useState([]);

  useEffect(async() => {
    try {
      const clientDb = await getAllClients() 
      setClients(clientDb)
    } catch (error) {
      
    }
  })
  const onFinish = async(values) => {
    console.log(values);
    const {
      projectName,
      client,
      date,
      contractNumber,
      serviceName,
      price,
      amount
    } = values
    const startedAt = new Date(date[0]).toLocaleDateString()
    const deadLine = new Date(date[1]).toLocaleDateString()
    const add = await createContract(uuidv4(), projectName, client, startedAt, deadLine, contractNumber, serviceName, price, amount)
    add.status === true ?
    message.success('A new contract added "Successfully"')
     : message.warning('Something went wrong');
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
            <Input autoComplete='off' placeholder="Project name" />
          </Form.Item>
          <Form.Item
            name="client"
            label="Client"
            rules={[
              {
                required: true,
                message: 'Choose Client'
              },
            ]}
          >
            <Select placeholder="Choose a client" allowClear>
              {clients.map(item => (
                <Option key={item.id} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date">
            <RangePicker
              // initialValues={[
              //   moment(moment(), dateFormat),
              //   moment(moment(), dateFormat),
              // ]}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            name="contractNumber"
            label="Contract Number"
            rules={[
              {
                required: true,
                message: 'Input contract number'
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
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
            <Input autoComplete='off' placeholder="Project name" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: 'Input contract price'
              },
            ]}
          >
            <InputNumber
              min={0}
            />
          </Form.Item>
          <Form.Item
            name="requiredPayment"
            label="Required payment"
            rules={[
              {
                required: true,
                message: 'Input contract percent'
              },
            ]}
          >
            <InputNumber
              min={0}
            />
          </Form.Item>
          <Space className='contract__submitBtn'>
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
