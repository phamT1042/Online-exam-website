'use client'

import React, { useEffect, useState } from 'react';
import './id.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Button, Menu, MenuItem } from '@mui/material';
import FileSaver from 'file-saver';
import {useParams} from "next/navigation";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);
// import { useParams } from 'react-router-dom';
const statistics = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [tests, setTests] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchTests = async () => {
            const token = sessionStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/admin/tests/statistics/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log('Tests data:', id);
            setTests(data.result);
        };

        fetchTests();


    }, []);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const pieChartData = {
        labels: ['Hoàn Thành', 'Không Hoàn Thành'],
        datasets: [
            {
                label: 'Tỷ Lệ Hoàn Thành',
                data: [
                    tests.filter((test) => test.score >= 5).length,
                    tests.filter((test) => test.score < 5).length,
                ],
                backgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };


    const scoreRanges = {
        '0-2': tests.filter((test) => test.score >= 0 && test.score < 2).length,
        '2-4': tests.filter((test) => test.score >= 2 && test.score < 4).length,
        '4-6': tests.filter((test) => test.score >= 4 && test.score < 6).length,
        '6-8': tests.filter((test) => test.score >= 6 && test.score < 8).length,
        '8-10': tests.filter((test) => test.score >= 8 && test.score < 10).length,
    };
    const barChartData = {
        labels: Object.keys(scoreRanges), // Labels for the bar chart
        datasets: [
            {
                label: 'Tần Suất Các Mức Điểm',
                data: Object.values(scoreRanges), // Values for the bar chart
                backgroundColor: '#FFCE56',
            },
        ],
    };
    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                stepSize: 1, // Minimum step size of 1
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            tests.map((test, index) => ({
                STT: index + 1,
                'Tên Sinh Viên': test.fullname,
                'Mã Sinh Viên': test.username,
                'Điểm': test.score,
                'Tỷ Lệ Đúng': test.scoreRatio,
                'Trạng Thái': test.completed ? 'Đã Nộp Bài' : 'Chưa Nộp Bài',
                'Thời Gian Nộp':test.submitTime,
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'DanhSachSinhVien');
        XLSX.writeFile(wb, 'DanhSachSinhVien.xlsx');
    };

    const exportToPDF = async () => {
        const pdf = new jsPDF();

        // Add font to support Vietnamese characters
        pdf.addFileToVFS('FreeSans.ttf', await fetch('https://raw.githubusercontent.com/mozilla/pdf.js/master/examples/learning/build/assets/FreeSans.ttf').then(r => r.arrayBuffer()));
        pdf.addFont('FreeSans.ttf', 'FreeSans', 'Normal');
        pdf.setFont('FreeSans', 'Normal');

        // Add table using autoTable
        pdf.autoTable({
            head: [['STT', 'Tên Sinh Viên', 'Mã Sinh Viên', 'Điểm', 'Tỷ Lệ Hoàn Thành', 'Trạng Thái', 'Thời Gian Nộp']],
            body: tests.map((test, index) => [
                index + 1,
                test.fullname,
                test.username,
                test.score,
                test.scoreRatio,
                test.completed ? 'Đã Nộp Bài' : 'Chưa Nộp Bài',
                test.submitTime,
            ]),
        });

        pdf.save('Danh sách sinh viên.pdf');
        handleMenuClose();
    };


    return (

        <div className="container">
            <ul className="tabs">
                <li
                    className={`tab ${activeTab === 1 ? '' : 'tabHidden'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Danh sách sinh viên
                </li>
                <li
                    className={`tab ${activeTab === 2 ? '' : 'tabHidden'}`}
                    onClick={() => handleTabClick(2)}
                >
                    Biểu đồ
                </li>
            </ul>


            <div className={`content ${activeTab === 1 ? '' : 'hidden'}`}>
                <div style={{ textAlign: 'right', paddingBottom: '10px' }}>
                    <Button variant="outlined" onClick={handleMenuOpen}>
                        Xuất tệp
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={exportToPDF}>Xuất tệp PDF</MenuItem>
                        <MenuItem onClick={exportToExcel}>Xuất tệp Excel</MenuItem>
                    </Menu>
                </div>
                <table className="table">
                    <thead>
                    <tr >
                        <th>STT</th>
                        <th>Tên Sinh Viên</th>
                        <th>Mã Sinh Viên</th>
                        <th>Điểm</th>
                        <th>Tỷ Lệ Hoàn Thành</th>
                        <th>Trạng Thái</th>
                        <th>Thời Gian Nộp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tests.map((test, index) => (
                        <tr key={test.id}>
                            <td>{index + 1}</td>
                            <td>{test.fullname}</td>
                            <td>{test.username}</td>
                            <td>{test.score}</td>
                            <td>{test.scoreRatio}</td>
                            <td>{test.completed ? 'Đã Nộp Bài' : 'Chưa Nộp Bài'}</td>
                            <td>{test.submitTime}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

            {/* Nội dung của tab 2 */}
            <div className={`content ${activeTab === 2 ? '' : 'hidden'}`}>
                <div className = {'chart'}>
                    <div style={{ width: '300px', height: '300px' }}>
                        <Pie data={pieChartData} />
                        <p>Biểu Đồ Tròn: Tỷ Lệ Hoàn Thành</p>
                    </div>
                    <div style={{ width: '500px', height: '500px', }}>
                        <Bar data={barChartData} options={barChartOptions} />
                        <p>Biểu Đồ Cột: Tần Suất Các Mức Điểm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default statistics;
