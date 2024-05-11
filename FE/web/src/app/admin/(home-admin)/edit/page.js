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
    const [form] = Form.useForm() // Clear form change password after submit
    const [formChangePassword, setFormChangePassword] = useState({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
    })

    useEffect(() => {
        document.title = "Đổi mật khẩu"
    }, []);

    const handleFormPassword = async () => {
        form.resetFields()
        const token = sessionStorage.getItem('token');
        try {
            const res = await fetch("http://localhost:8080/api/students/users/update-password", {
                method: "PUT",
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
                <div className='bg-white block p-9 rounded-md flex-[0_0_20%]'>
                    <div>
                        <span className='text-3xl font-semibold'> Cấu hình chung </span>
                    </div>

                    <div className='mt-5'>
                        <div className='border-b-[1px] mb-2 text-2xl font-semibold'>Bảo mật</div>
                        <div
                            className='text-xl font-medium text-ptit cursor-pointer hover:bg-gray-100'
                        >
                            Đổi mật khẩu
                        </div>
                    </div>

                </div>

                <div className='ml-4 bg-white block p-9 rounded-md flex-[0_0_50%]'>
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
                </div>
            </div>
        </section>
    )
}

export default page