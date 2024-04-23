import React from 'react'
import { useState, useEffect } from 'react'

import { message, Collapse, Table, Button, Modal } from 'antd'
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

import { writeFile } from 'xlsx';
import { utils } from 'xlsx';

const SearchStudentElement = ({ user }) => {
    const [dataTestSearch, setDataTestSearch] = useState([])
    const [dataTestDetail, setDataTestDetail] = useState()

    const [openModal, setOpenModal] = useState(false)
    const [activeKey, setActiveKey] = useState(null);

    const columns = [
        {
            title: <div className='text-base'>STT</div>,
            key: 'index',
            render: (text, record, index) => <div style={{ fontSize: '18px' }}>{index + 1}</div>,
        },
        {
            title: <div className='text-base'>Thời gian nộp</div>,
            dataIndex: 'submitTime',
            key: 'submitTime'
        },
        {
            title: <div className='text-base'>Tên bài thi</div>,
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: <div className='text-base'>Kỳ thi</div>,
            dataIndex: 'exam',
            key: 'exam'
        },
        {
            title: <div className='text-base'>Điểm</div>,
            dataIndex: 'score',
            key: 'score',
            sorter: (a, b) => a.score - b.score
        },
        {
            title: <div className='text-base'>Trạng thái</div>,
            dataIndex: 'completed',
            key: 'completed',
            render: text => <div>{text ? "Hoàn thành" : "Không hoàn thành"}</div>,
        },
        {
            title: <div className='text-base'>Xem</div>,
            key: 'detail',
            render: (text, record) =>
                <Button
                    className='bg-ptit font-semibold text-white cursor-pointer'
                    onClick={() => handleButtonClick(record.id)}
                >
                    Chi tiết
                </Button>
            ,
        }
    ];

    const fetchDataTest = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/search/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const fetchData = await res.json();

            if (fetchData.code === 200) {
                setDataTestSearch(fetchData.result);
                // console.log(fetchData.result)
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch data test')
        }
    }

    const handleButtonClick = async (testId) => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/search/detail?userId=${user.id}&testId=${testId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const fetchData = await res.json();

            if (fetchData.code === 200) {
                setDataTestDetail(fetchData.result);
                setOpenModal(true);
                // console.log(fetchData.result)
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch data test')
        }
    };

    useEffect(() => {
        if (activeKey === user.id) {
            fetchDataTest();
        }
    }, [activeKey]);

    const handleCollapseChange = (key) => {
        // Check if the array of keys contains the user.id
        if (key.includes(user.id)) {
            setActiveKey(user.id);
        } else {
            setActiveKey(null);
        }
        // console.log(key)
    };

    const exportExcel = async () => {
        const head = [
            { v: "Kết quả các bài thi của sinh viên " + (user.fullname ? `${user.fullname} - ${user.username}` : user.username), t: 's' }
        ];

        const title = [
            { v: 'STT', t: 's' },
            { v: 'Tên bài thi', t: 's' },
            { v: 'Kỳ thi', t: 's' },
            { v: 'Điểm', t: 's' },
            { v: 'Thời gian nộp', t: 's' },
            { v: 'Hoàn thành', t: 's' },
        ];

        const emptyRow = Array(6).fill({ v: '', t: 's' });

        const newData = dataTestSearch.map((item, index) => ([
            { v: index + 1, t: 'n' },
            { v: item.name, t: 's' },
            { v: item.exam, t: 's' },
            { v: item.score, t: 'n' },
            { v: item.submitTime, t: 's' },
            { v: item.completed ? 'Hoàn thành' : 'Không hoàn thành', t: 's' },
        ]));

        const ws = utils.aoa_to_sheet([head, emptyRow, title, ...newData]);

        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");

        const nameFile = user.fullname ? `${user.fullname} - ${user.username}` : user.username
        writeFile(wb, nameFile + '.xlsx');
    }

    return (
        <>
            <Modal
                title="Xem chi tiết bài làm"
                centered
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                width={1000}
            >
                {
                    dataTestDetail && JSON.stringify(dataTestDetail, null, 2)
                }
            </Modal>

            <Collapse
                className='bg-ptit'
                size='middle'
                key={user.id}
                collapsible="header"
                defaultActiveKey={['0']}
                onChange={handleCollapseChange}
                items={[
                    {
                        key: user.id,
                        label: <h1 className='text-white'> {user.fullname ? `${user.fullname} - ${user.username}` : user.username} </h1>,
                        children: (
                            <>
                                <div className='mb-2 flex justify-between'>
                                    <h3> Số bài thi đã tham gia: {user.cntTest} </h3>
                                    <Button
                                        className='bg-ptit font-semibold text-white cursor-pointer flex justify-center'
                                        icon={<SimCardDownloadOutlinedIcon />}
                                        onClick={exportExcel}
                                    >
                                        Xuất Excel
                                    </Button>
                                </div>

                                <Table
                                    dataSource={dataTestSearch}
                                    columns={columns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                />
                            </>
                        ),
                    },
                ]}
            />
        </>

    )
}

export default SearchStudentElement