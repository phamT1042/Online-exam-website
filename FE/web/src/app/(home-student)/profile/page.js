'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, message } from 'antd'

const page = () => {
    const [data, setData] = useState({})
    const router = useRouter()
    // const [dataSource, setDataSource] = useState({})
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
        {
            key: '3',
            test: 'Lập trình C++',
            exam: "Kỳ thi giữa kỳ II năm 2021-2022",
            result: '28/40',
            score: 7.00
        },
        {
            key: '4',
            test: 'Lập trình Java',
            exam: "Kỳ thi cuối kỳ II năm 2021-2022",
            result: '35/40',
            score: 8.75
        },
        {
            key: '5',
            test: 'Lập trình Python',
            exam: "Kỳ thi giữa kỳ I năm 2022-2023",
            result: '30/40',
            score: 7.50
        },
        {
            key: '6',
            test: 'Lập trình Web',
            exam: "Kỳ thi cuối kỳ I năm 2022-2023",
            result: '38/40',
            score: 9.50
        },
        {
            key: '7',
            test: 'Lập trình C#',
            exam: "Kỳ thi giữa kỳ II năm 2022-2023",
            result: '32/40',
            score: 8.00
        },
        {
            key: '8',
            test: 'Lập trình JavaScript',
            exam: "Kỳ thi cuối kỳ II năm 2022-2023",
            result: '34/40',
            score: 8.50
        },
        {
            key: '9',
            test: 'Lập trình C#',
            exam: "Kỳ thi giữa kỳ II năm 2022-2023",
            result: '32/40',
            score: 8.00
        },
        {
            key: '10',
            test: 'Lập trình JavaScript',
            exam: "Kỳ thi cuối kỳ II năm 2022-2023",
            result: '34/40',
            score: 8.50
        },
        {
            key: '11',
            test: 'Lập trình JavaScript',
            exam: "Kỳ thi cuối kỳ II năm 2022-2023",
            result: '34/40',
            score: 8.50
        },
        {
            key: '12',
            test: 'Lập trình JavaScript',
            exam: "Kỳ thi cuối kỳ II năm 2022-2023",
            result: '34/40',
            score: 8.50
        },

    ];

    const columns = [
        {
            title: <div className='text-xl'>Tên bài thi</div>, // Change font size here
            dataIndex: 'test',
            key: 'test',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Kỳ thi</div>,
            dataIndex: 'exam',
            key: 'exam',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Kết quả</div>,
            dataIndex: 'result',
            key: 'result',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
        },
        {
            title: <div className='text-xl'>Điểm số</div>,
            dataIndex: 'score',
            key: 'score',
            render: text => <div style={{ fontSize: '18px' }}>{text}</div>,
            sorter: (a, b) => a.score - b.score
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
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch profile')
        }
    }

    useEffect(() => {
        document.title = "Hồ sơ"
        fetchData()
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
                            <p className='mt-1 text-xl font-semibold'> {data.fullName} </p>
                            <button
                                className='form-submit w-1/2'
                                onClick={() => router.push('/edit')}
                            >
                                Cập nhật thông tin
                            </button>
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
                                <p className='mt-5 text-xl font-semibold'> Ngày sinh: <span className='text-gray-500 font-light'> {data?.date} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Giới tính: <span className='text-gray-500 font-light'> {data?.sex} </span> </p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> Địa chỉ: </p>
                                <span className='text-gray-500 font-light text-xl'> {data?.address} </span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p className='mt-5 text-xl font-semibold'> SĐT: <span className='text-gray-500 font-light'> {data?.phone} </span> </p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* History exam */}
                <div className='ml-2 flex-[0_0_60%]'>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        </section>
    )
}

export default page