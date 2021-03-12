import React, { useEffect, useState } from "react";
import Button from "../../styles/button";
import { useHistory } from "react-router-dom";
import { getAllContracts, deleteContract } from '../../utils/contract'
import { ReactComponent as Icon } from "../../assets/svg/addContract.svg";
import { Spin, Popconfirm, message, Table, Modal, Form, Input, DatePicker, InputNumber, Space } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import Spinner from '../../styles/spinner'
import "./style.css";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const Index = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [initialForm, setInitialForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    { title: 'Qarzdorlik', dataIndex: 'debt', key: 'debt' },
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
              okText="Yes"
              cancelText="No"
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

  const onFinish = (values) => {
    console.log('Success:', values);
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

  console.log(initialForm.debt);
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
          <Form.Item
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
            rules={[
              {
                required: true,
                message: 'Client'
              },
            ]}
          >
            <Input autoComplete='off' placeholder="Client" />
          </Form.Item>
          <Form.Item name="date">
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
            name="amount"
            rules={[
              {
                required: true,
                message: 'Input contract percent'
              },
            ]}
          >
            <InputNumber
              min={0}
              max={initialForm.debt}
            />
          </Form.Item>
          <Space className='contract__submitBtn'>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Cancel</Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
