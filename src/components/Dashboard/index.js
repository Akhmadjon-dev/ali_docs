import React, { useEffect, useState } from 'react';
import { getAllClients } from '../../utils/client'
import { getAllContracts, deleteContract } from '../../utils/contract'
import S from "../../styles/dashboard"
import Spinner from "../../styles/spinner"
import { Spin, Table } from 'antd'
import { 
    AuditOutlined, 
    TeamOutlined, 
    CheckSquareOutlined, 
} from "@ant-design/icons";


function Dashboard() {
    const [data, setData] = useState([])
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('')

    

    const clientsColumns = [
        { title: 'Ism-familiyasi', dataIndex: 'name', key: 'name' },
        { title: 'Kompaniyasi', dataIndex: 'company', key: 'company' },
        { title: 'Telifon raqami', dataIndex: 'phone', key: 'phone' },
        { title: 'Email manzili', dataIndex: 'email', key: 'email' },
      ];

    const compColumns = [
        { title: 'Proekt nomi', dataIndex: 'projectName', key: 'projectName' },
        { title: 'Mijoz', dataIndex: 'client', key: 'client' },
        { 
            title: 'Shartnoma holati', 
            dataIndex: 'status', 
            key: 'status', 
            render: text => text ? 'Tugallangan' : 'Tugallanmagan'
        },
        { title: 'Qarzdorlik', dataIndex: 'debt', key: 'debt' },
      ];
    

    useEffect(async () => {
        try {
            const clientDb = await getAllClients();
            const contractDb = await getAllContracts();
            const dt = { clients: [...clientDb], contracts: [...contractDb] }
            setData(dt)
            setIsLoading(false)

        } catch (err) {
            console.error(err);
        }
    }, [])

    const finishedWorks = data?.contracts?.filter(item => {
        return item.status === true
    })

    const unFinishedWorks = data?.contracts?.filter(item => {
        return item.status === false
    })

    const debtors = data?.clients?.filter(item => {
        return item.debt === true
    })

    console.log(list);
    return (
        <>
            <div style={{ display: isLoading ? 'none' : 'block' }}>
                <S.Wrapper>
                    <S.Card
                        style={{background: category === 'clients' && '#e7e5ff'}}
                        onClick={() => {setList(data?.clients); setCategory('clients')}}>
                        <div className='card__icon'>
                            <TeamOutlined />
                        </div>
                        <p className='card__title'>Mijozlar soni:</p>
                        <p className='card__qty'>{data?.clients?.length}</p>
                    </S.Card>
                    <S.Card
                        style={{background: category === 'debtors' && '#e7e5ff'}}
                        onClick={() => {setList(debtors); setCategory('debtors')}}>
                        <div className='card__icon'>
                            <AuditOutlined />
                        </div>
                        <p className='card__title'>Qarzdor mijozlar:</p>
                        <p className='card__qty'>{debtors?.length}</p>
                    </S.Card>
                    <S.Card
                        style={{background: category === 'contracts' && '#e7e5ff'}}
                        onClick={() => {setList(data?.contracts); setCategory('contracts')}}>
                        <div className='card__icon'>
                            <AuditOutlined />
                        </div>
                        <p className='card__title'>Shartnomalar soni:</p>
                        <p className='card__qty'>{data?.contracts?.length}</p>
                    </S.Card>
                    <S.Card
                        style={{background: category === 'finished' && '#e7e5ff'}}
                        onClick={() => {setList(finishedWorks); setCategory('finished')}}>
                        <div className='card__icon'>
                            <CheckSquareOutlined />
                        </div>
                        <p className='card__title'>Bitirilgan shartnomalar soni:</p>
                        <p className='card__qty'>{finishedWorks?.length}</p>
                    </S.Card>
                    <S.Card
                        style={{background: category === 'unfinished' && '#e7e5ff'}}
                        onClick={() => {setList(unFinishedWorks); setCategory('unfinished')}}>
                        <div className='card__icon'>
                            <AuditOutlined />
                        </div>
                        <p className='card__title'>Tugatilmagan shartnomalar soni:</p>
                        <p className='card__qty'>{unFinishedWorks?.length}</p>
                    </S.Card>
                </S.Wrapper>
                <Table
                    style={{ display: !list.length ? 'none' : 'block' }}
                    columns={list[0]?.name ? clientsColumns : compColumns}
                    dataSource={list}
                    />
            </div>
            <Spinner>
                <Spin style={{ display: isLoading ? 'block' : 'none' }} size='large' />
            </Spinner>
        </>
    );
}

export default Dashboard;