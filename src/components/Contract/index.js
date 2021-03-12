import React, { useEffect, useState } from "react";
import Button from "../../styles/button";
import { useHistory } from "react-router-dom";
import { getAllContracts, deleteContract, updateContract } from '../../utils/contract'
import { ReactComponent as Icon } from "../../assets/svg/addContract.svg";
import {
  Spin,
  Popconfirm,
  message,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Space,
  Checkbox
} from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import Spinner from '../../styles/spinner'
import "./style.css";

const { RangePicker } = DatePicker;

const dateFormat = "MM/DD/YYYY";

const Index = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();



  const columns = [
    { title: 'Proekt nomi', dataIndex: 'projectName', key: 'projectName' },
    { title: 'Mijoz', dataIndex: 'client', key: 'client' },
    {
      title: 'Shartnoma davomiyligi',
      dataIndex: '',
      key: 'date',
      render: record => record.startedAt + " - " + record.deadLine
    },
    {
      title: 'Shartnoma holati',
      dataIndex: 'status',
      key: 'status',
      render: text => text ? 'Tugallangan' : 'Tugallanmagan'
    },
    { 
      title: 'Qarzdorlik', 
      dataIndex: 'debt', 
      key: 'debt',
      render: text => text.toLocaleString("en-GB")
     },
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
              title={record.contractNumber + " o'chirilsinmi?"}
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
      const clientList = await getAllContracts()
      setData(clientList)
      setIsLoading(false)
    } catch (error) {

    }
  }, [isModalVisible])

  const onFinish = async (values) => {
    console.log('Success:', values);
    const {
      projectName,
      client,
      date,
      contractNumber,
      serviceName,
      price,
      amount,
    } = values
    const startedAt = new Date(date[0]).toLocaleDateString()
    const deadLine = new Date(date[1]).toLocaleDateString()
    const add = await updateContract(initialForm.id, projectName, client, startedAt, deadLine, contractNumber, serviceName, price, amount, isFinished)
    add.status === true ?
      message.success('A new contract updated "Successfully"') && modalHandler({})
      : message.warning('Something went wrong');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const modalHandler = (e) => {
    setIsModalVisible(!isModalVisible)
    setInitialForm(e)
  }

  const confirm = async (e) => {
    const newData = data.filter(item => item.id != e.id)
    const dlt = await deleteContract(e.id)
    dlt.status === true ?
      message.success(e.name + " o'chirildi") && setData(newData) :
      message.warning("O'chirishda hatolik bor!")
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const addHandler = () => {
    history.push("/contracts-add");
  };
  return (
    <>
      <div className="contract">
        <div className="contract__top">
          <h2>Contracts</h2>
          <Button onClick={addHandler}>
            <Icon />
            <span>New Contract</span>
          </Button>
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => record?.total.map(item => (
              item.amount != 0 &&
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 50px'}} key={item.id}>
                <p>{new Date(item.time).toDateString()}</p>
                <p>{item.amount.toLocaleString("en-GB")}</p>
              </div>
            )),
            rowExpandable: record => record.total?.length,
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
          <span>Proekt nomi</span>
          <Form.Item
            name="status"
          >
            <Checkbox onChange={(e) => setIsFinished(e.target.checked)}>
              Tamomlandi
            </Checkbox>
          </Form.Item>
          <span>Proekt nomi</span>
          <Form.Item
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
          <span>Klient</span>
          <Form.Item
            name="client"
            rules={[
              {
                required: true,
                message: 'Klient'
              },
            ]}
          >
            <Input autoComplete='off' placeholder="Client" />
          </Form.Item>
          <span>Muddat ({initialForm.startedAt + ' - ' + initialForm.deadLine})</span>
          <Form.Item name="date"
            rules={[
              {
                required: true,
                message: 'Muddatni kiriting'
              }

            ]}
          >
            <RangePicker
              format={dateFormat}
            />
          </Form.Item>
          <span>Shartnoma raqami</span>
          <Form.Item
            name="contractNumber"
            rules={[
              {
                required: true,
                message: 'Shartnoma raqamini kiriting'
              },
            ]}
          >
            <InputNumber
              placeholder="Shartnoma raqami"
              min={0}
            />
          </Form.Item>
          <span>Xizmat nomi</span>
          <Form.Item
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
          <span>Shartnoma narxi</span>
          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: 'Shartnoma narxini kiriting'
              },
            ]}
          >
            <InputNumber
              placeholder="Shartnoma narxi"
              min={0}
            />
          </Form.Item>
          <span>To'lov summasi</span>
          <Form.Item
            name="amount"
            rules={[
              {
                required: true,
                message: "To'lov summasini kiriting"
              },
            ]}
            initialValue='0'
          >
            <InputNumber
              min={0}
              max={initialForm.debt}
              placeholder="To'lov summasi"
            />
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
