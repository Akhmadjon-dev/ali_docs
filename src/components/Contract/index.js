import React, {useEffect, useState} from "react";
import Button from "../../styles/button";
import { useHistory } from "react-router-dom";
import {getAllContracts, deleteContract} from '../../utils/contract'
import { ReactComponent as Icon } from "../../assets/svg/addContract.svg";
import { Spin, Popconfirm, message, Table } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import Spinner from '../../styles/spinner'
import "./style.css";

const Index = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
          <button className='edite--btn'>
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
  }, [])


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

  console.log(data);
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
    </>
  );
};

export default Index;
