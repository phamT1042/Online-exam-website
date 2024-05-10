
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter  } from 'next/navigation';
import { Menu, MenuItem, Button } from '@mui/material';
import { message, Space } from 'antd';

import SearchStudentElement from '@/components/SearchStudentElement';

const TestTable = () => {
    const [tests, setTests] = useState([]);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterBy, setFilterBy] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTests = async () => {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/students/tests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTests(data.result);
        };

        fetchTests();
    }, []);

    const handleOpenMenu = (event, column) => {
        setAnchorEl(event.currentTarget); // Open the menu at the specified location
        setFilterBy(column); // Determine the column to filter
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close the dropdown menu
    };

    const handleFilterSelect = (value) => {
        console.log('Selected filter value:', value);
        setFilterValue(value); // Set the filter value
        handleCloseMenu(); // Close the menu after selection
    };

    const handleTestClick = (canEnter, testId) => {
        if (canEnter === 1 || canEnter === 2) {
            router.push(`/questions/${testId}`);
        } else {
            message.error('Không thể vào làm bài');
        }
    };

    const renderTestStatus = (canEnter, testId) => {
        let buttonClass = '';
        let buttonText = '';
        if (canEnter === 1) {
            buttonClass = 'status-button-success';
            buttonText = 'Vào Làm';
        } else if (canEnter === 2) {
            buttonClass = 'status-button-warning';
            buttonText = 'Làm Lại';
        } else if (canEnter === 0) {
            buttonClass = 'status-button-disabled';
            buttonText = 'Không Thể làm';
        } else {
            buttonClass = 'status-button-error';
            buttonText = 'Đã Hoàn Thành';
        }
        return (
            <button
                className={buttonClass}
                onClick={() => handleTestClick(canEnter, testId)}
            >
                {buttonText}
            </button>
        );
    };

    // Get unique values for the dropdown menu
    const uniqueNames = [...new Set(tests.map((test) => test.name))];
    const uniqueExams = [...new Set(tests.map((test) => test.exam))];
    const uniqueTypes = [...new Set(tests.map((test) => test.type))];

    // Filter tests based on search and dropdown filters
    const filteredTests = tests.filter((test) => {
        const lowerCaseSearch = search.toLowerCase();
        const matchesSearch =
            test.name.toLowerCase().includes(lowerCaseSearch) ||
            test.exam.toLowerCase().includes(lowerCaseSearch);
        if (filterBy && filterValue) {
            console.log('Filtering by:', filterBy, 'with value:', filterValue);
            if (filterBy === 'name') {
                return test.name === filterValue && matchesSearch;
            } else if (filterBy === 'exam') {
                return test.exam === filterValue && matchesSearch;
            } else if (filterBy === 'type') {
                return test.type === Number(filterValue) && matchesSearch;
            }
        }
        if(filterBy == 'type' && filterValue == 0){
            return test.type === Number(filterValue) && matchesSearch;
        }

        return matchesSearch;
    });

    return (
        <div>
            <style jsx>{`
        .container {
          margin: 20px;
        }
        
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        
        .search-input {
          margin-bottom: 20px;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th,
        td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ccc;
        }
        
        th {
          font-weight: bold;
          background-color: #bb2019;
          color: #fff;
        }

        .filter-button {
          border: none;
          cursor: pointer;
        }
        
        .filter-button:hover {
          background-color: #ddd;
          color: black;
        }
        
        .status-button-success {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          background-color: #4caf50;
        }
        
        .status-button-warning {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          background-color: #ffc107;
        }
        
        .status-button-error {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          background-color: #f44336;
        }
        
        .status-button-disabled {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          color: #fff;
          background-color: #ccc;
        }
      `}</style>

            <div className="container">
                <h1>Danh sách các bài Kiểm Tra</h1>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                    <thead>
                    <tr >
                        <th>STT</th>
                        <th>
                            <button className="filter-button" onClick={(event) => handleOpenMenu(event, 'name')}>
                                Bài Thi
                            </button>
                        </th>
                        <th>
                            <button className="filter-button" onClick={(event) => handleOpenMenu(event, 'exam')}>
                                Kỳ Thi
                            </button>
                        </th>
                        <th>
                            <button className="filter-button" onClick={(event) => handleOpenMenu(event, 'type')}>
                                Loại
                            </button>
                        </th>
                        <th>Trạng Thái</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTests.map((test, index) => (
                        <tr key={test.id}>
                            <td>{index + 1}</td>
                            <td>{test.name}</td>
                            <td>{test.exam}</td>
                            <td>{test.type === 0 ? 'Tự Do' : 'Có Thời Hạn'}</td>
                            <td>{renderTestStatus(test.canEnter, test.id)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    {filterBy === 'name' &&
                        uniqueNames.map((name) => (
                            <MenuItem key={name} onClick={() => handleFilterSelect(name)}>
                                {name}
                            </MenuItem>
                        ))}
                    {filterBy === 'exam' &&
                        uniqueExams.map((exam) => (
                            <MenuItem key={exam} onClick={() => handleFilterSelect(exam)}>
                                {exam}
                            </MenuItem>
                        ))}
                    {filterBy === 'type' &&
                        uniqueTypes.map((type) => (
                            <MenuItem key={type} onClick={() => handleFilterSelect(type)}>
                                {type === 0 ? 'Tự Do' : 'Có Thời Hạn'}
                            </MenuItem>
                        ))}

                </Menu>

            </div>
        </div>
    );
};


export default TestTable;
