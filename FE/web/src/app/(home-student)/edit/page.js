'use client'
import React from 'react'
import moment from 'moment'

import { useState, useEffect } from 'react'
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    message,
    Spin
} from 'antd';
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 8
        }
    },
    wrapperCol: {
        xs: {
            span: 24
        },
        sm: {
            span: 16
        }
    }
};

const page = () => {
    const [data, setData] = useState({})
    const [changeSetting, setChangeSetting] = useState(true)
    const [loading, setLoading] = useState(true);
    const [formChangeProfile, setFormChangeProfile] = useState({
        fullName: null,
        email: null,
        phone: null,
        date: null,
        sex: null,
        address: null
    })
    const [formChangePassword, setFormChangePassword] = useState({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
    })
    const [form] = Form.useForm() // Clear form change password after submit

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
                setLoading(false);
            }
            else {
                message.error('Error network')
            }
        } catch (error) {
            message.error('Error catch fetch profile')
        }
    }

    useEffect(() => {
        document.title = "Cập nhật thông tin"
        fetchData()
    }, []);

    if (loading) {
        return <Spin className='flex justify-center items-center' />;
    }

    const handleFormProfile = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:8080/api/user/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullName: formChangeProfile.fullName,
                    email: formChangeProfile.email,
                    phone: formChangeProfile.phone,
                    date: formChangeProfile.date,
                    sex: formChangeProfile.sex,
                    address: formChangeProfile.address
                })
            })

            const check = await res.json();

            if (check.code === 200) {
                setData(check.result);
                message.success('Cập nhật thành công')
            }
            else {
                message.error('Cập nhật thất bại')
            }
        } catch (error) {
            message.error('Error catch update profile')
        }
    }

    const handleFormPassword = async () => {
        form.resetFields()
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:8080/api/user/update-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    oldPassword: formChangePassword.oldPassword,
                    newPassword: formChangePassword.newPassword
                })
            })

            const check = await res.json();

            if (check.code === 200) {
                message.success('Cập nhật thành công')
            }
            else {
                message.error('Mật khẩu cũ không đúng')
            }
        } catch (error) {
            message.error('Error catch update password')
        }
    }

    return (
        <section>
            <div className='flex justify-center box-border'>
                {/* Choose setting */}
                <div className='bg-white block p-9 rounded-md flex-[0_0_20%]'>
                    <div>
                        <span className='text-3xl font-semibold'> Cấu hình chung </span>
                    </div>

                    <div className='mt-5'>
                        <div className='border-b-[1px] mb-2 text-2xl font-semibold'>Chung</div>
                        <div
                            className='text-xl font-medium text-ptit cursor-pointer hover:bg-gray-100'
                            onClick={() => {
                                if (!changeSetting) setChangeSetting(true)
                            }}
                        >
                            Sửa thông tin
                        </div>
                    </div>

                    <div className='mt-5'>
                        <div className='border-b-[1px] mb-2 text-2xl font-semibold'>Bảo mật</div>
                        <div
                            className='text-xl font-medium text-ptit cursor-pointer hover:bg-gray-100'
                            onClick={() => {
                                if (changeSetting) setChangeSetting(false)
                            }}
                        >
                            Đổi mật khẩu
                        </div>
                    </div>

                </div>

                {/* Change profile */}
                {changeSetting && <div className='ml-4 bg-white block p-9 rounded-md flex-[0_0_50%]'>
                    <div className='text-2xl font-semibold mb-5'> Cập nhật thông tin </div>
                    <Form
                        {...formItemLayout}
                        variant="filled"
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            fullName: data?.fullName,
                            email: data?.email,
                            date: data.date ? moment(data.date, "DD/MM/YYYY") : undefined,
                            address: data?.address,
                            sex: data?.sex,
                            phone: data?.phone
                        }}
                        onFinish={handleFormProfile}
                    >
                        <Form.Item
                            label="Tên đầy đủ"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                            ]}
                        >
                            <Input
                                onChange={e => setFormChangeProfile({ ...formChangeProfile, fullName: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống trường này',
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ',
                                }
                            ]}
                        >
                            <Input
                                onChange={e => setFormChangeProfile({ ...formChangeProfile, email: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                            ]}
                        >
                            <DatePicker
                                format={["DD/MM/YYYY"]}
                                onChange={(date, dateString) => {
                                    setFormChangeProfile({ ...formChangeProfile, date: dateString });
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                        >
                            <Input.TextArea
                                onChange={e => setFormChangeProfile({ ...formChangeProfile, address: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giới tính"
                            name="sex"
                        >
                            <Select
                                onChange={value => {
                                    setFormChangeProfile({ ...formChangeProfile, sex: value });
                                }}
                            >
                                <Select.Option value="Nam"> Nam </Select.Option>
                                <Select.Option value="Nữ"> Nữ </Select.Option>
                                <Select.Option value="Khác"> Khác </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                        >
                            <Input
                                onChange={e => setFormChangeProfile({ ...formChangeProfile, phone: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='form-submit flex justify-center items-center'
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>

                </div>}

                {/* Change password */}
                {!changeSetting && <div className='ml-4 bg-white block p-9 rounded-md flex-[0_0_50%]'>
                    <div className='text-2xl font-semibold mb-5'> Đổi mật khẩu </div>
                    <Form
                        {...formItemLayout}
                        variant="filled"
                        style={{
                            maxWidth: 600,
                        }}
                        onFinish={handleFormPassword}
                        form={form}
                    >
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                            ]}
                        >
                            <Input.Password
                                onChange={e => setFormChangePassword({ ...formChangePassword, oldPassword: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                                {
                                    pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/,
                                    message: `Mật khẩu phải dài ít nhất 8 kí tự, chứa ít nhất 1 ký tự số và 1 ký tự chữ`
                                }
                            ]}
                        >
                            <Input.Password
                                onChange={e => setFormChangePassword({ ...formChangePassword, newPassword: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại không đúng'));
                                    },
                                })
                            ]}
                        >
                            <Input.Password
                                onChange={e => setFormChangePassword({ ...formChangePassword, confirmPassword: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className='form-submit flex justify-center items-center'
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </div>}
            </div>
        </section>
    )
}

export default page