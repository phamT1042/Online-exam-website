'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, message } from 'antd'

const page = () => {
    const [dataProfile, setDataProfile] = useState({})
    const [dataTest, setDataTest] = useState([])

    const router = useRouter()

    const columns = [
        {
            title: <div className='text-xl'>STT</div>,
            key: 'index',
            render: (text, record, index) => <div style={{ fontSize: '18px' }}>{index + 1}</div>,
        },
        {
            title: <div className='text-xl'>Thời gian nộp</div>, // Change font size here
            dataIndex: 'submitTime',
            key: 'submitTime',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Tên bài thi</div>, // Change font size here
            dataIndex: 'name',
            key: 'name',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Kỳ thi</div>, // Change font size here
            dataIndex: 'exam',
            key: 'exam',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Số câu trả lời đúng</div>,
            dataIndex: 'scoreRatio',
            key: 'scoreRatio',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Điểm</div>,
            dataIndex: 'score',
            key: 'score',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
            sorter: (a, b) => a.score - b.score
        },
        {
            title: <div className='text-xl'>Trạng thái</div>,
            dataIndex: 'completed',
            key: 'completed',
            render: text => <div style={{ fontSize: '18px' }}>{text ? "Hoàn thành" : "Không hoàn thành"}</div>,
        },
        
    ];

    const fetchDataProfile = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:8080/api/students/users/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const fetchData = await res.json();

            if (fetchData.code === 200) {
                setDataProfile(fetchData.result);
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch profile')
        }
    }

    const fetchDataTest = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:8080/api/students/tests/history", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const fetchData = await res.json();

            if (fetchData.code === 200) {
                setDataTest(fetchData.result);
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch history test')
        }
    }

    useEffect(() => {
        document.title = "Hồ sơ"
        fetchDataProfile()
        fetchDataTest()
    }, []);

    return (
        <section>
            <div className='flex justify-center box-border'>
                {/* Profile user */}
                <div className='bg-white block p-9 rounded-md flex-[0_0_30%]'>
                    <ul className='flex justify-center flex-col'>
                        <li className='flex justify-center flex-col items-center mt-3 mb-4'>
                            <div className='size-36'>
                                <img src="https://code.ptit.edu.vn/2020/images/avt.png" alt="User image"></img>
                            </div>
                            <p className='mt-1 text-xl font-semibold'> {dataProfile?.fullName} </p>
                            <button
                                className='form-submit w-1/2'
                                onClick={() => router.push('/edit')}
                            >
                                Cập nhật thông tin
                            </button>
                        </li>
                        <li>
                            <div>
                                <p className='mt-1 text-xl font-semibold'> Tên tài khoản: <span className='text-gray-500 font-light'> {dataProfile?.username} </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Email: <span className='text-gray-500 font-light'> {dataProfile?.email} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Ngày sinh: <span className='text-gray-500 font-light'> {dataProfile?.date} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Giới tính: <span className='text-gray-500 font-light'> {dataProfile?.sex} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Địa chỉ: </p>
                                <span className='text-gray-500 font-light text-xl'> {dataProfile?.address} </span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> SĐT: <span className='text-gray-500 font-light'> {dataProfile?.phone} </span> </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* History test */}
                <div className='ml-2 flex-[0_0_60%]'>
                    <Table
                        dataSource={dataTest}
                        columns={columns}
                        rowKey="id"
                    />
                </div>
            </div>
        </section>
    )
}

export default page