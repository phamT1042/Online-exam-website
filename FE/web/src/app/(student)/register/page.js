'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { message } from 'antd'

import FormElement from '@/components/FormElement'

const page = () => {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/

    const router = useRouter();
    const [formRegister, setFormRegister] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

    useEffect(() => {
        document.title = "Đăng ký"
    }, []);

    function handleBlur(type, value, valueBonus) {
        switch (type) {
            case 'username':
                if (value === '') {
                    setUsernameErr('Tên đăng nhập không được để trống');
                }
                else if (value.length < 6) {
                    setUsernameErr('Tên đăng nhập phải tối thiểu 6 ký tự');
                }
                else {
                    setUsernameErr('');
                    return true;
                }
                break;
            case 'email':
                if (value === '') {
                    setEmailErr('Email không được để trống');
                }
                else if (!regexEmail.test(value)) {
                    setEmailErr('Email không đúng định dạng');
                }
                else {
                    setEmailErr('');
                    return true;
                }
                break;
            case 'password':
                if (value === '') {
                    setPasswordErr('Mật khẩu không được để trống');
                }
                else if (!regexPassword.test(value)) {
                    setPasswordErr('Mật khẩu dài ít nhất 8 kí tự không chứa ký tự đặc biệt, chứa ít nhất 1 chữ số và 1 chữ cái');
                }
                else {
                    setPasswordErr('');
                    return true;
                }
                break;
            case 'confirmPassword':
                if (value === '') {
                    setConfirmPasswordErr('Không được để trống');
                }
                else if (value !== valueBonus) {
                    setConfirmPasswordErr('Mật khẩu nhập lại không đúng');
                }
                else {
                    setConfirmPasswordErr('');
                    return true;
                }
                break;
        }
        return false;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const valid = handleBlur('username', formRegister.username)
            || handleBlur('email', formRegister.email)
            || handleBlur('password', formRegister.password)
            || handleBlur('confirmPassword', formRegister.confirmPassword)

        if (!valid) return
        try {
            const res = await fetch("http://localhost:8080/api/students/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formRegister.username,
                    password: formRegister.password,
                    email: formRegister.email
                })
            })
            const data = await res.json();
            if (data.code === 200) {
                message.success("Đăng ký thành công")
                router.push('/login')
            }
            else {
                message.error("Tên đăng nhập hoặc email đã được sử dụng")
            }
        } catch (error) {
            message.error("Đăng ký thất bại. Có lỗi xảy ra")
            console.log(error)
        }
    }

    return (
        <div className='bg-[#f1f1f1]'>
            <div className="bottom-0 absolute">
                <img src="https://code.ptit.edu.vn/2020/images/bg_left.png" className="h-[400px]" />
            </div>
            <div className="bottom-0 absolute right-0">
                <img src="https://code.ptit.edu.vn/2020/images/bg_right.png" className="h-[400px]" />
            </div>

            <main className='min-h-screen flex justify-center'>
                <form className='form-login-register z-10 w-[590px]' onSubmit={handleFormSubmit}>
                    <img src="../assets/logo_ptit.png" className='block mx-auto' />

                    <h3 className="mt-5">Đăng ký</h3>
                    <h2>Hệ thống thi trắc nghiệm PTIT</h2>

                    {<FormElement
                        type="username"
                        label="Tên đăng nhập"
                        placeHolder="Nhập tên đăng nhập"
                        handleChange={e => setFormRegister({ ...formRegister, username: e.target.value })}
                        handleClick={() => {if (usernameErr) setUsernameErr('')}}
                        handleBlur={() => handleBlur('username', formRegister.username)}
                        errorVal={usernameErr}
                    />}

                    {<FormElement
                        type="email"
                        label="Email"
                        placeHolder="Nhập email"
                        handleChange={e => setFormRegister({ ...formRegister, email: e.target.value })}
                        handleClick={() => {if (emailErr) setEmailErr('')}}
                        handleBlur={() => handleBlur('email', formRegister.email)}
                        errorVal={emailErr}
                    />}

                    {<FormElement
                        type="password"
                        label="Mật khẩu"
                        placeHolder="Nhập mật khẩu"
                        handleChange={e => setFormRegister({ ...formRegister, password: e.target.value })}
                        handleClick={() => {if (passwordErr) setPasswordErr('')}}
                        handleBlur={() => handleBlur('password', formRegister.password)}
                        errorVal={passwordErr}
                    />}

                    {<FormElement
                        type="confirmPassword"
                        label="Nhập lại mật khẩu"
                        placeHolder="Nhập lại mật khẩu"
                        handleChange={e => setFormRegister({ ...formRegister, confirmPassword: e.target.value })}
                        handleBlur={() => handleBlur('confirmPassword', formRegister.confirmPassword, formRegister.password)}
                        handleClick={() => {if (confirmPasswordErr) setConfirmPasswordErr('')}}
                        errorVal={confirmPasswordErr}
                    />}

                    <button className="form-submit" type="submit">Đăng ký</button>
                </form>
            </main>
        </div>
    )
}

export default page