"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import {
  message,
  Space,
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
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

function reverseDateFormat(dateString) {
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return null; // Nếu định dạng không đúng, trả về null
  }

  const [year, month, day] = parts;
  // Sử dụng Template literals để tạo định dạng mới
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

const page = () => {
  const [value, setValue] = React.useState(0);
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [userCur, setUserCur] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    sex: null,
    phone: "",
    address: "",
    photo: null,
    date: "",
    roles: [""],
  });

  const resetUserCur = () => {
    setUserCur({
      username: "",
      password: "",
      email: "",
      fullName: "",
      sex: "",
      phone: "",
      address: "",
      photo: null,
      date: "",
      roles: [""],
    });
  };

  useEffect(() => {
    const fetchTests = async () => {
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
    };

    fetchTests();
  }, []); // useEffect sẽ chạy một lần duy nhất khi component được render

  useEffect(() => {
    const fetchUsers = async () => {
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
    };

    fetchUsers();
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

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userCur), // Chuyển đổi dữ liệu thành chuỗi JSON trước khi gửi
      });
      if (response.ok) {
        message.success("Thêm người dùng thành công!");
        resetUserCur();
        window.location.reload();

        // Thực hiện các hành động khác sau khi thêm người dùng thành công
      } else {
        message.error("Thêm người dùng thất bại!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Thêm người dùng thất bại!");
    }
  };

  const handleEditUser = async (userId) => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserCur(data.result);
        setShowEditUserModal(true);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${userCur.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userCur),
        }
      );
      if (response.ok) {
        message.success("Cập nhật người dùng thành công!");
        resetUserCur();
        window.location.reload();
        // Thực hiện các hành động khác sau khi test đã được tạo
      } else {
        message.error("Cập nhật người dùng thất bại!");
      }
    } catch (error) {
      message.error("Cập nhật người dùng thất bại!");
    }
    resetUserCur();
  };

  const handleDeleteUserSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${selectedUserId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        message.success("Xóa người dùng thành công!");
        window.location.reload();
        // Thực hiện các hành động khác sau khi test đã đượcxXóa
      } else {
        message.error("Xóa người dùng thất bại!");
      }
    } catch (error) {
      message.error("Xóa người dùng thất bại!");
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
            <tr className="grid md:grid-cols-10 grid-cols-6">
              {/* <th className="border border-gray-300">Id</th> */}
              <th className="border border-gray-300 col-span-2">Tên kì thi</th>
              <th className="border border-gray-300 col-span-2">Tên bài thi</th>
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
            {!tests ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              tests.map((test) => (
                <tr key={test.id} className="grid grid-cols-6 md:grid-cols-10">
                  {/* <td className="border border-gray-300">{test.id}</td> */}
                  <td className="flex border px-5 col-span-2 border-gray-300 text-center items-center justify-center">
                    {test.exam}
                  </td>
                  <td className="flex border col-span-2 border-gray-300 text-center items-center justify-center">
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
          onClick={() => setShowAddUserModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center justify-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Thêm người dùng
        </button>

        <table className="table-auto w-full border border-collapse border-gray-300">
          <thead>
            <tr className="grid md:grid-cols-10 grid-cols-7">
              {/* <th className="border border-gray-300">Id</th> */}
              <th className="border border-gray-300">Tên đăng nhập</th>
              <th className="border border-gray-300">Họ và tên</th>
              <th className="border border-gray-300">Ngày sinh</th>
              <th className="border border-gray-300 col-span-2 hidden md:block">
                Email
              </th>
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
            {!users ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="grid md:grid-cols-10 grid-cols-7">
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.username}
                  </td>
                  <td className="flex border border-gray-300 text-center items-center justify-center">
                    {user.fullName}
                  </td>
                  <td className="border border-gray-300 hidden md:flex text-center items-center justify-center">
                    {user.date}
                  </td>
                  <td className="border border-gray-300 col-span-2 hidden md:flex text-center items-center justify-center">
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
                      onClick={() => {
                        setSelectedUserId(user.id);
                        handleEditUser(user.id);
                      }}
                      type="button"
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Sửa
                    </button>
                  </td>
                  <td className="flex border border-gray-300 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowDeleteUserModal(true);
                      }}
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
      <Modal
        title="Xác nhận xóa bài thi"
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onOk={confirmDeleteTest}
      >
        <p>Bạn có chắc chắn muốn xóa bài thi này không?</p>
      </Modal>

      <Modal
        title="Thêm người dùng"
        open={showAddUserModal}
        onCancel={() => {
          resetUserCur();
          setShowAddUserModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => setShowAddUserModal(false)}>
            Hủy
          </Button>,
          <Button
            form="addUserForm"
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={(e) => handleUserSubmit(e)}
          >
            Thêm
          </Button>,
        ]}
      >
        <Form name="addUserForm" layout="vertical">
          <Form.Item
            label="Tên người dùng"
            name="username"
            initialValue={userCur.username}
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, username: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            initialValue={userCur.password}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) =>
                setUserCur({ ...userCur, password: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            initialValue={userCur.fullName}
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, fullName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            initialValue={userCur.address}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, address: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={userCur.email}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            initialValue={userCur.phone}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, phone: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Giới tính" name="sex" initialValue={userCur.sex}>
            <Select
              onSelect={(value, event) =>
                setUserCur({ ...userCur, sex: [value] })
              }
              options={[
                {
                  value: "NAM",
                  label: "NAM",
                },
                {
                  value: "NU",
                  label: "NỮ",
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="date"
            initialValue={
              userCur.date ? dayjs(userCur.date, "DD/MM/YYYY") : null
            }
          >
            <DatePicker
              onChange={(dateCur, dateString) =>
                setUserCur({
                  ...userCur,
                  date: reverseDateFormat(dateString),
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="roles"
            initialValue={userCur.roles[0]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò!",
              },
            ]}
          >
            <Select
              onSelect={(value, event) =>
                setUserCur({ ...userCur, roles: [value] })
              }
              options={[
                {
                  value: "STUDENT",
                  label: "STUDENT",
                },
                {
                  value: "ADMIN",
                  label: "ADMIN",
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Sửa người dùng"
        open={showEditUserModal}
        onCancel={() => {
          resetUserCur();
          setShowEditUserModal(false);
        }}
        footer={[
          <Button key="back" onClick={() => setShowEditUserModal(false)}>
            Hủy
          </Button>,
          <Button
            form="editUserForm"
            key="submit"
            type="primary"
            htmlType="submit"
            onClick={(e) => handleEditUserSubmit(e)}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form name="editUserForm" layout="vertical">
          <Form.Item
            label="Tên người dùng"
            name="username"
            initialValue={userCur.username}
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, username: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            initialValue={userCur.fullName}
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, fullName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            initialValue={userCur.address}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, address: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            initialValue={userCur.email}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            initialValue={userCur.phone}
          >
            <Input
              onChange={(e) =>
                setUserCur({ ...userCur, phone: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Giới tính" name="sex" initialValue={userCur.sex}>
            <Select
              onSelect={(value, event) =>
                setUserCur({ ...userCur, sex: [value] })
              }
              options={[
                {
                  value: "NAM",
                  label: "NAM",
                },
                {
                  value: "NU",
                  label: "NỮ",
                },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="date"
            initialValue={
              userCur.date ? dayjs(userCur.date, "DD/MM/YYYY") : null
            }
          >
            <DatePicker
              onChange={(dateCur, dateString) =>
                setUserCur({
                  ...userCur,
                  date: reverseDateFormat(dateString),
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="Vai trò"
            name="roles"
            initialValue={userCur.roles[0]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò!",
              },
            ]}
          >
            <Select
              onSelect={(value, event) =>
                setUserCur({ ...userCur, roles: [value] })
              }
              options={[
                {
                  value: "STUDENT",
                  label: "STUDENT",
                },
                {
                  value: "ADMIN",
                  label: "ADMIN",
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Xác nhận xóa người dùng"
        open={showDeleteUserModal}
        onCancel={() => setShowDeleteUserModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowDeleteUserModal(false)}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={(e) => handleDeleteUserSubmit(e)}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </Modal>
    </Box>
  );
};

export default page;
