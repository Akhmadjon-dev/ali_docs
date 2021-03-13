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
  const history = useHistory();

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
    message.success('A new contract added "Successfully"') && history.push("/contracts")
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
            Kontraktlar
          </Link>{" "}
          {" / "}
          <Link className="add__firstStep add__secondStep" to="/contracts-add">
              Yangi Kontrakt
          </Link>
        </div>
        <h2 className="add__title">Yangi Kontrakt</h2>
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
            label="Proekt nomi"
            name="projectName"
            rules={[
              {
                required: true,
                message: "Proekt nomini kiriting!",
              },
            ]}
          >
            <Input autoComplete='off' placeholder="Proekt nomi" />
          </Form.Item>
          <Form.Item
            name="client"
            label="Klient"
            rules={[
              {
                required: true,
                message: 'Klientni tanlang'
              },
            ]}
          >
            <Select placeholder="Klientni tanlang" allowClear>
              {clients.map(item => (
                <Option key={item.id} value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Muddat">
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
            label="Shartnoma raqami"
            rules={[
              {
                required: true,
                message: 'Shartnoma raqamini kiriting'
              },
            ]}
          >
            <InputNumber placeholder="Shartnoma raqami" min={0} />
          </Form.Item>
          <Form.Item
            label="Xizmat nomi"
            name="serviceName"
            rules={[
              {
                required: true,
                message: "Xizmat nomini kiriting",
              },
            ]}
          >
            <Input autoComplete='off' placeholder="Xizmat nomi" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Narx"
            rules={[
              {
                required: true,
                message: 'Narxni kiriting'
              },
            ]}
          >
            <InputNumber
            placeholder='Narxni kiriting'
              min={0}
            />
          </Form.Item>
          <Form.Item
            name="requiredPayment"
            label="Boshlang'ich narx"
            rules={[
              {
                required: true,
                message: "Boshlang'ich narxni kiriting"
              },
            ]}
          >
            <InputNumber
              placeholder="Boshlang'ich narx"
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
