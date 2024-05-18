'use client'

import React, { useEffect, useState } from 'react';
import './statistics.css';
import { useRouter } from "next/navigation";
import { Button, Menu, MenuItem } from "@mui/material";
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const Statistics = () => {
    const [activeTab, setActiveTab] = useState(1); // 1 là tab đầu tiên
    const [tests, setTests] = useState([]);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [filterBy, setFilterBy] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTests = async () => {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/admin/tests/statistics', {
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

        const fetchUsers = async () => {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/api/admin/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUsers(data.result);
        };

        fetchUsers();
    }, []);

    const handleOpenMenu = (event, column) => {
        setAnchorEl(event.currentTarget); // Open the menu at the specified location
        setFilterBy(column); // Determine the column to filter
    };

    const handleCloseMenu = () => {
        setAnchorEl(null); // Close the dropdown menu
    };

    const handleFilterSelect = (value) => {
        setFilterValue(value); // Set the filter value
        handleCloseMenu(); // Close the menu after selection
    };

    const uniqueNames = [...new Set(tests.map((test) => test.name))];
    const uniqueExams = [...new Set(tests.map((test) => test.exam))];

    // Filter tests based on search and dropdown filters
    const filteredTests = tests.filter((test) => {
        const lowerCaseSearch = search.toLowerCase();
        const matchesSearch =
            test.name.toLowerCase().includes(lowerCaseSearch) ||
            test.exam.toLowerCase().includes(lowerCaseSearch);
        if (filterBy && filterValue) {
            if (filterBy === 'name') {
                return test.name === filterValue && matchesSearch;
            } else if (filterBy === 'exam') {
                return test.exam === filterValue && matchesSearch;
            }
        }

        return matchesSearch;
    });

    const handleTestClick = (testId) => {
        router.push(`/admin/statistics/${testId}`);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            filteredTests.map((test, index) => ({
                STT: index + 1,
                'Bài Thi': test.name,
                'Kỳ Thi': test.exam,
                'Điểm Trung Bình': test.mediumScore,
                'Tỷ Lệ Hoàn Thành': test.completionRate,
                'Tổng số SV tham gia': test.cntStudent,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Statistics');
        XLSX.writeFile(wb, 'statistics.xlsx');
    };

    const handlePrint = () => {
        const printContent = `
            <h1>Danh sách bài thi</h1>
            ${document.getElementById('printable-area').outerHTML}
        `;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
            <head>
                <title>In bảng</title>
                <style>
                    /* Add any styles you want to apply to the printed table here */
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>
                ${printContent}
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div className="container">
            <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                <Button variant="outlined" onClick={exportToExcel}>
                    Excel
                </Button>
                <Button variant="outlined" onClick={handlePrint} style={{ marginLeft: '10px' }}>
                    In
                </Button>
            </div>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="table" id="printable-area">
                <thead>
                <tr>
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
                    <th>Điểm Trung Bình</th>
                    <th>Tỷ Lệ Hoàn Thành</th>
                    <th>Tổng số SV tham gia</th>
                </tr>
                </thead>
                <tbody>
                {filteredTests.map((test, index) => (
                    <tr key={test.id}>
                        <td>{index + 1}</td>
                        <td
                            className="clickable"
                            onClick={() => handleTestClick(test.id)}
                        >
                            {test.name}
                        </td>
                        <td>{test.exam}</td>
                        <td>{test.mediumScore}</td>
                        <td>{test.completionRate}</td>
                        <td>{test.cntStudent}</td>
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
    );
};

export default Statistics;
