'use client'

import React, {useEffect, useState} from 'react'; // Để sử dụng useState
import './statistics.css';
import {useRouter} from "next/navigation";
import {Button, Menu, MenuItem} from "@mui/material";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
const statistics = () => {
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
            console.log('Tests data:', data);
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
            console.log('Tests data:', data);
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
        console.log('Selected filter value:', value);
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
            console.log('Filtering by:', filterBy, 'with value:', filterValue);
            if (filterBy === 'name') {
                return test.name === filterValue && matchesSearch;
            } else if (filterBy === 'exam') {
                return test.exam === filterValue && matchesSearch;
            }
        }

        return matchesSearch;
    });

    const handleTestClick = (testId) => {
        router.push(`/admin/statistics/{testId}`);
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ['STT', 'Bài Thi', 'Kỳ Thi', 'Điểm Trung Bình', 'Tỷ Lệ Hoàn Thành', 'Tổng số SV tham gia'];
        const tableRows = [];

        filteredTests.forEach((test, index) => {
            const rowData = [
                index + 1,
                test.name,
                test.exam,
                test.mediumScore,
                test.completionRate,
                test.cntStudent,
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save('statistics.pdf');
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

    return (

        <div className="container">
            <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                <Button variant="outlined" onClick={handleMenuOpen}>
                    Xuất tệp
                </Button>

                {/*<Menu*/}
                {/*    anchorEl={anchorEl}*/}
                {/*    open={Boolean(anchorEl)}*/}
                {/*    onClose={handleMenuClose}*/}
                {/*>*/}
                {/*    <MenuItem onClick={exportToPDF}>Xuất tệp PDF</MenuItem>*/}
                {/*    <MenuItem onClick={exportToExcel}>Xuất tệp Excel</MenuItem>*/}
                {/*</Menu>*/}
            </div>
            <input
                className="search-input"
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="table">
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
                <MenuItem onClick={exportToPDF}>Xuất tệp PDF</MenuItem>
                <MenuItem onClick={exportToExcel}>Xuất tệp Excel</MenuItem>
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

export default statistics;
