import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addClients.svg";
import { deleteClient, getAllClients, updateClient } from "../../utils/client";
import Spinner from '../../styles/spinner'
import S from '../../styles/client'
import "./style.css";
import { 
  Spin, 
  Popconfirm, 
  message, 
  Table, 
  Modal, 
  Form, 
  Input, 
  Space 
} from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";

const Index = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const columns = [
    { title: 'Ism-familiyasi', dataIndex: 'name', key: 'name' },
    { title: 'Kompaniyasi', dataIndex: 'company', key: 'company' },
    { title: 'Telifon raqami', dataIndex: 'phone', key: 'phone' },
    { title: 'Email manzili', dataIndex: 'email', key: 'email' },
    {
      title: <SettingOutlined />,
      dataIndex: '',
      key: 'x',
      render: (record) => (
        <div className='list__buttons'>
          <button onClick={() => modalHandler(record)} className='edite--btn'>
            <EditOutlined />
          </button>
          <button className='delete--btn'>
            <Popconfirm
              placement="topRight"
              title={record.name + " o'chirilsinmi?"}
              onConfirm={() => confirm(record)}
              onCancel={cancel}
              okText="Ha"
              cancelText="Yo'q"
            >
              <DeleteOutlined />
            </Popconfirm>
          </button>
        </div>),
    },
  ];

  useEffect(async () => {
    try {
      const clientList = await getAllClients()
      setData(clientList)
      setIsLoading(false)
    } catch (error) {

    }
  }, [isModalVisible])


  const onFinish = async (values) => {
    const {
      name,
      company,
      phone,
      email,
      postCode
    } = values
    const add = await updateClient(initialForm.id, name, company, phone, email, postCode)
    add.status === true ?
      message.success('Client updated "Successfully"') && modalHandler({})
      : message.warning('Something went wrong');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const modalHandler = (e) => {
    setInitialForm(e)
    setIsModalVisible(!isModalVisible)
  }

  const confirm = async (e) => {
    const newData = data.filter(item => item.id != e.id)
    const dlt = await deleteClient(e.id)
    dlt.status === true ?
      message.success(e.name + " o'chirildi") && setData(newData) :
      message.warning("O'chirishda hatolik bor!")
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  const addHandler = () => {
    history.push("/clients-add");
  };

  console.log(initialForm);

  return (
    <>
      <div style={{ display: isLoading ? 'none' : 'block' }} className="clients">
        <div className="clients__top">
          <h2>Klientlar</h2>
          <Button onClick={addHandler}>
            <Icon />
            <span>Yangi Klient</span>
          </Button>
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => <p style={{ margin: 0 }}>{record.name}</p>,
            rowExpandable: record => record.contracts,
          }}
          dataSource={data}
        />
      </div>
      <Spinner>
        <Spin style={{ display: isLoading ? 'block' : 'none' }} size='large' />
      </Spinner>
      <Modal footer={false} title="Basic Modal" visible={isModalVisible} onCancel={() => modalHandler({})}>
      <Form
          name="basic"
          initialValues={initialForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <span>Mijoz ismi</span>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Mijoz Ismini kiriting!",
              },
            ]}
          >
            <Input autoComplete='off' placeholder="Mijoz ismi" />
          </Form.Item>
          <span>Kompaniya nomi</span>
          <Form.Item
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
          <span>Telifon raqami</span>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Telifon raqamini kiriting",
              },
            ]}
          >
            <Input type='tell' placeholder="Telifon raqami" />
          </Form.Item>
          <span>Email manzil</span>
          <Form.Item
            name="email"
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
            <Input placeholder="Email" />
          </Form.Item>
          <span>Pochta indeksi</span>
          <Form.Item
            name="postCode"
            rules={[
              {
                required: true,
                message: "Pochta indeksini kiriting",
              },
            ]}
          >
            <Input placeholder="Pochta indeksi" />
          </Form.Item>
          <Space className='contract__submitBtn'>
            <Button style={{marginLeft: '32%'}} type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
