"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { message, Space, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component="div" sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const page = () => {
  const [value, setValue] = React.useState(0);
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchTests = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8080/api/admin/tests", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTests(data.result);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
      setIsLoading(false);
    };

    fetchTests();
  }, []); // useEffect sẽ chạy một lần duy nhất khi component được render

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8080/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data.result);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []); // useEffect sẽ chạy một lần duy nhất khi component được render

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/tests/statistics",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setStatistics(data.result);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
      setIsLoading(false);
    };

    fetchStatistics();
  }, []); // useEffect sẽ chạy một lần duy nhất khi component được render

  const handleDeleteTest = (testId) => {
    setSelectedTestId(testId);
    setShowDeleteModal(true);
  };

  const confirmDeleteTest = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/tests/${selectedTestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        message.success("Xóa bài thi thành công!");
        window.location.reload();
        // Thực hiện các hành động khác sau khi test đã đượcxXóa
      } else {
        message.error("Xóa bài thi thất bại!");
      }
    } catch (error) {
      message.error("Xóa bài thi thất bại!");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Danh sách bài thi"
            {...a11yProps(0)}
            className="text-lg font-bold"
          />
          <Tab
            label="Danh sách người dùng"
            {...a11yProps(1)}
            className="text-lg font-bold"
          />
          <Tab
            label="Danh sách thống kê"
            {...a11yProps(2)}
            className="text-lg font-bold"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Link href={"/admin/create-test"}>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Thêm bài thi
          </button>
        </Link>

        <table className="table-auto w-full border border-collapse border-gray-300">
          <thead>
            <tr className="grid md:grid-cols-8 grid-cols-6">
              {/* <th className="border border-gray-300">Id</th> */}
              <th className="border border-gray-300">Tên kì thi</th>
              <th className="border border-gray-300">Tên bài thi</th>
              <th className="border border-gray-300 hidden md:block">
                Ngày bắt đầu
              </th>
              <th className="border border-gray-300 hidden md:block">
                Ngày kết thúc
              </th>
              <th className="border border-gray-300">Thời gian</th>
              <th className="border border-gray-300">Trạng thái</th>
              <th className="border border-gray-300">Sửa</th>
              <th className="border border-gray-300">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id} className="grid grid-cols-6 md:grid-cols-8">
                  {/* <td className="border border-gray-300">{test.id}</td> */}
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {test.exam}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {test.name}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {test.startTime}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {test.endTime}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {test.duration}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {test.type === 1 ? "Có thời hạn" : "Tự do"}
                  </td>
                  <td className="flex border border-gray-300 items-center justify-center">
                    <Link href={`/admin/update-test/${test.id}`}>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Sửa
                      </button>
                    </Link>
                  </td>
                  <td className="flex border border-gray-300 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteTest(test.id)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Thêm người dùng
        </button>

        <table className="table-auto w-full border border-collapse border-gray-300">
          <thead>
            <tr className="grid md:grid-cols-9 grid-cols-7">
              {/* <th className="border border-gray-300">Id</th> */}
              <th className="border border-gray-300">Tên đăng nhập</th>
              <th className="border border-gray-300">Họ và tên</th>
              <th className="border border-gray-300">Ngày sinh</th>
              <th className="border border-gray-300 hidden md:block">Email</th>
              <th className="border border-gray-300 hidden md:block">
                Địa chỉ
              </th>
              <th className="border border-gray-300">Số điện thoại</th>
              <th className="border border-gray-300">Vai trò</th>
              <th className="border border-gray-300">Sửa</th>
              <th className="border border-gray-300">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="grid md:grid-cols-9 grid-cols-7">
                  {/* <td className="border border-gray-300">{test.id}</td> */}
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.username}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.fullName}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {user.date}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {user.address}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.phone}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.roles}
                  </td>
                  <td className="flex border border-gray-300 items-center justify-center">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Sửa
                    </button>
                  </td>
                  <td className="flex border border-gray-300 items-center justify-center">
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <table className="table-auto w-full border border-collapse border-gray-300">
          <thead>
            <tr className="grid grid-cols-6">
              {/* <th className="border border-gray-300">Id</th> */}
              <th className="border border-gray-300">Tên kì thi</th>
              <th className="border border-gray-300">Tên bài thi</th>
              <th className="border border-gray-300">Số lượng tham gia thi</th>
              <th className="border border-gray-300">Điểm trung bình</th>
              <th className="border border-gray-300">Tỷ lệ hoàn thành</th>
              <th className="border border-gray-300">Xem chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              statistics.map((statistic) => (
                <tr key={statistic.id} className="grid grid-cols-6 h-14">
                  {/* <td className="border border-gray-300">{test.id}</td> */}
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {statistic.exam}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {statistic.name}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {statistic.cntStudent}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {statistic.mediumScore}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {statistic.completionRate}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    <Link href={""}>
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Xem
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CustomTabPanel>
      <Modal
        title="Xác nhận xóa bài thi"
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={confirmDeleteTest}
      >
        <p>Bạn có chắc chắn muốn xóa bài thi này không?</p>
      </Modal>
    </Box>
  );
};

export default page;
