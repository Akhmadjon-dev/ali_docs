import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  message ,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
  const history = useHistory();

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
    message.success('A new client added "Successfully"') && history.push("/clients")
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
            Klientlar
          </Link>{" "}
          {" / "}
          <Link className="add__firstStep add__secondStep" to="/clients-add">
            Yangi Klient
          </Link>
        </div>
        <h2 className="add__title">Yangi Klient</h2>
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
            label="Klient Ismi"
            name="name"
            rules={[
              {
                required: true,
                message: "Klient Ismini kiriting!",
              },
            ]}
          >
            <Input placeholder="Klient Ismi" />
          </Form.Item>
          <Form.Item
            label="Kompaniya nomi"
            name="company"
            rules={[
              {
                required: true,
                message: "Kompaniya nomini kiriting",
              },
            ]}
          >
            <Input placeholder="Kompaniya nomi" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telifon raqami"
            rules={[
              {
                required: true,
                message: "Telifon raqamini kiriting",
              },
            ]}
          >
            <Input type='number' placeholder="Telifon raqam" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email manzil"
            rules={[
              {
                type: 'email',
                message: 'Manzil Emailga mos emas!',
            },
            {
                required: true,
                message: "Email manzilni kiriting",
            },
            ]}
          >
            <Input placeholder="Email manzil" />
          </Form.Item>
          <Form.Item
            name="postCode"
            label="Pochta raqami"
            rules={[
              {
                required: true,
                message: "Pochta raqamini kiriting",
              },
            ]}
          >
            <Input placeholder="Pochta raqami" />
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