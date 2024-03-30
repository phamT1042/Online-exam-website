'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'antd'

const page = () => {
    const [data, setData] = useState({})
    const dataSource = [
        {
            key: '1',
            test: 'Mạng máy tính',
            exam: "Kỳ thi cuối kỳ I năm 2021-2022",
            result: '33/40',
            score: 8.50
        },
        {
            key: '2',
            test: 'Mạng máy tính',
            exam: "Kỳ thi cuối kỳ I năm 2021-2022",
            result: '33/40',
            score: 8.50
        },
    ];

    const columns = [
        {
            title: 'Tên bài thi',
            dataIndex: 'test',
            key: 'test',
        },
        {
            title: 'Kỳ thi',
            dataIndex: 'exam',
            key: 'exam',
        },
        {
            title: 'Kết quả',
            dataIndex: 'result',
            key: 'result',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
        }
    ];
    const fetchData = async () => {
        const token = sessionStorage.getItem('token');

        try {
            const res = await fetch("http://localhost:8080/api/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const fetchData = await res.json();

            if (fetchData.code === 200) {
                setData(fetchData.result);
                console.log(fetchData)
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch profile')
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <section>
            <div className='flex justify-center box-border'>
                {/* Profile user */}
                <div className='bg-white block p-9 rounded-md'>
                    <ul className='flex justify-center flex-col'>
                        <li className='flex justify-center flex-col items-center mt-3 mb-4'>
                            <div className='size-36'>
                                <img src="https://code.ptit.edu.vn/2020/images/avt.png" alt="User image"></img>
                            </div>
                            <p className='mt-1 text-xl font-semibold'> {data.fullname || "Phạm Văn Tiến"} </p>
                            <button className='form-submit w-1/2'> Cập nhật thông tin </button>
                        </li>
                        <li>
                            <div>
                                <p className='mt-1 text-xl font-semibold'> Tên tài khoản: <span className='text-gray-500 font-light'> {data?.username} </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Email: <span className='text-gray-500 font-light'> {data?.email} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Ngày sinh: <span className='text-gray-500 font-light'> {data?.date || "16/10/2003"} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Giới tính: <span className='text-gray-500 font-light'> {data?.sex || "Nam"} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Địa chỉ: </p>
                                <span className='text-gray-500 font-light text-xl'> {data?.address || "xã ĐO IVOD, huyện DKOC PDSA, thành phố Hà Nội"} </span> 
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> SĐT: <span className='text-gray-500 font-light'> {data?.phone || "0373945923"} </span> </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* History exam */}
                <div className='ml-2'>
                    <Table 
                        dataSource={dataSource} columns={columns} 
                        className='min-w-[50vw]'
                    />
                </div>
            </div>
        </section>
    )
}

export default page