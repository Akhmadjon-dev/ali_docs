import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  message ,
} from "antd";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

import "./style.css";
import { createClient } from "../../utils/client";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};



const AddClient = (values) => {
  

  const onFinish = async(values) => {
    const {
      name,
      company, 
      phone,
      email,
      postCode
    } = values
     
     const add = await createClient(uuidv4(), name, company, phone, email, postCode)
     add.status === true ?
    message.success('A new client added "Successfully"')
     : message.warning('Something went wrong');
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
            name="name"
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
            label="Company name"
            name="company"
            rules={[
              {
                required: true,
                message: "Please input Company name",
              },
            ]}
          >
            <Input placeholder="Company name" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Client phone"
            rules={[
              {
                required: true,
                message: "Please input phone name",
              },
            ]}
          >
            <Input type='number' placeholder="Client phone" />
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
                    message: "Please input email name",
                },
            ]}
          >
            <Input placeholder="Client email" />
          </Form.Item>
          <Form.Item
            name="postCode"
            label="Post code"
            rules={[
              {
                required: true,
                message: "Please input PostCode name",
              },
            ]}
          >
            <Input placeholder="Post code" />
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

export default AddClient;