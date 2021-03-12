import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import Button from "../../styles/button";
import { ReactComponent as Icon } from "../../assets/svg/addClients.svg";
import { deleteClient, getAllClients } from "../../utils/client";
import Spinner from '../../styles/spinner'
import S from '../../styles/client'
import "./style.css";
import { Spin, Popconfirm, message, Table } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { getAllContracts } from "../../utils/contract";

const Index = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
      const clientList = await getAllClients()
      setData(clientList)
      setIsLoading(false)
    } catch (error) {

    }
  }, [])


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

  console.log(data);

  return (
    <>
      <div style={{ display: isLoading ? 'none' : 'block' }} className="clients">
        <div className="clients__top">
          <h2>Clients</h2>
          <Button onClick={addHandler}>
            <Icon />
            <span>New Clients</span>
          </Button>
        </div>
        {/* <S.Wrapper>
          {data.map(item => (
            <S.List key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.company}</p>
              <p>{item.phone}</p>
              <p>{item.email}</p>
              <div className='list__buttons'>
                <button className='edite--btn'>
                  <EditOutlined />
                </button>
                <button className='delete--btn'>
                <Popconfirm
                  placement="topRight"
                  title={item.name + " o'chirilsinmi?"}
                  onConfirm={() => confirm(item)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  >
                  <DeleteOutlined />
                  </Popconfirm>
                  </button>
                  </div>
                  </S.List>
                  ))}
                  </S.Wrapper>
                */}

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
