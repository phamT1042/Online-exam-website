'use client'

import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { message, Collapse, Space, Table } from 'antd'

export default function TestDetail() {
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const [dataTestSearch, setDataTestSearch] = useState([])
    const [dataTestDetail, setDataTestDetail] = useState()

    const handleSearch = async () => {
        setIsLoading(true);
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:8080/api/admin/users/search?name=${search}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const check = await res.json();

            if (check.code === 200) {
                setDataSearch(check.result)
                console.log(dataSearch)
            }
            setIsLoading(false);
        } catch (error) {
            message.error('Error catch')
        }
    }

    return (
        <section>
            <div className="flex flex-col items-center">
                <h1 className='font-semibold'>Xem kết quả thi của sinh viên</h1>
                <div className="flex mt-2">
                    <input
                        type="text"
                        className="pl-4 pr-4 w-72 text-lg border-2 border-black hover:border-blue-300"
                        placeholder="Nhập tên hoặc mã sinh viên"
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        className="ml-auto bg-ptit px-3 py-3 text-white border-none cursor-pointer font-semibold rounded-full"
                        onClick={() => { if (search.length > 0) handleSearch() }}
                    >
                        {isLoading ? <CircularProgress className="align-middle m-0 p-0" size={24} /> : <SearchIcon size={24} />}
                    </button>
                </div>

                <Space direction="vertical" size={'middle'} className='mt-7 w-1/2'>
                    {dataSearch.map((user) => (
                        <Collapse
                            className='bg-ptit'
                            size='middle'
                            key={user.id}
                            collapsible="header"
                            defaultActiveKey={['0']}
                            items={[
                                {
                                    key: user.id,
                                    label: <h1 className='text-white'> {user.fullname ? `${user.fullname} - ${user.username}` : user.username} </h1>,
                                    children: (
                                        // <Table dataSource={/* your data source */} columns={/* your columns */} />
                                        <></>
                                    ),
                                },
                            ]}
                        />
                    ))}
                </Space>
            </div>

            {/* <div class="overlay hidden"></div> */}

            {/* <section class="modal hidden">
                <div class="flex">
                    <button class="btn-close" onClick="closeModal()">⨉</button>
                </div>
                <div id="exam-details" style="overflow: auto">
                    <!-- exam detail will be add here -->
                </div>
            </section> */}
        </section>
    )
}