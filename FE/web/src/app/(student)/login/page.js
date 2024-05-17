'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { message } from 'antd'

import FormElement from '@/components/FormElement'

const page = () => {
    const router = useRouter();
    const [formLogin, setFormLogin] = useState({
        username: '',
        password: ''
    });
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    useEffect(() => {
        document.title = "Đăng nhập"
    }, []);

    function handleBlur(type, value) {
        switch (type) {
            case 'username':
                if (value === '') {
                    setUsernameErr('Tên đăng nhập không được để trống');
                }
                else {
                    setUsernameErr('');
                    return true;
                }
                break;
            case 'password':
                if (value === '') {
                    setPasswordErr('Mật khẩu không được để trống');
                }
                else {
                    setPasswordErr('');
                    return true;
                }
                break;
        }
        return false;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        let valid = handleBlur('username', formLogin.username)
        valid = handleBlur('password', formLogin.password) && valid
        if (!valid) return

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formLogin.username,
                    password: formLogin.password
                })
            })
            const data = await res.json();
            if (data.code === 200) {
                message.success('Đăng nhập thành công')

                sessionStorage.setItem('token', data.result.token)
                sessionStorage.setItem('username', data.result.username)

                router.push('/dashboard')
            }
            else {
                message.error('Tài khoản hoặc mật khẩu không đúng')
            }
        } catch (error) {
            message.error('Lỗi đăng nhập')
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
                <form className='form-login-register z-10' onSubmit={handleFormSubmit}>
                    <img src="../assets/logo_ptit.png" className='block mx-auto' />

                    <h3 className="mt-5">Đăng nhập</h3>
                    <h2>Hệ thống thi trắc nghiệm PTIT</h2>

                    {<FormElement
                        type="username"
                        label="Tên đăng nhập"
                        placeHolder="Nhập tên đăng nhập"
                        handleClick={() => {if (usernameErr) setUsernameErr('')}}
                        handleChange={e => setFormLogin({ ...formLogin, username: e.target.value })}
                        handleBlur={() => handleBlur('username', formLogin.username)}
                        errorVal={usernameErr}
                    />}

                    {<FormElement
                        type="password"
                        label="Mật khẩu"
                        placeHolder="Nhập mật khẩu"
                        handleChange={e => setFormLogin({ ...formLogin, password: e.target.value })}
                        handleBlur={() => handleBlur('password', formLogin.password)}
                        errorVal={passwordErr}
                        handleClick={() => {if (passwordErr) setPasswordErr('')}}
                    />}

                    <button className="form-submit" type="submit">Đăng nhập</button>

                    <div className="mt-4 mb-1">
                        Hoặc
                        <Link href='/register'>
                            <button className="form-submit"> Đăng ký </button>
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default page