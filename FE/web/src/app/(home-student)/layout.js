'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Layout } from 'antd';
const { Content } = Layout;

import Header from "@/components/Core/Header";
import Footer from "@/components/Core/Footer";

export default function HomeLayout({ children }) {
    const router = useRouter();
    const tabs = [
        { name: "Trang chủ", path: "/dashboard" },
        { name: "Hồ sơ", path: "/profile" },
        { name: "Đăng xuất", path: "/login" }
    ]

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        if (!token && token === null) {
            router.replace('/login');
        }
    }, []);

    return (
        <>
            <Header
                tabs={tabs}
            />
            <Content
                style={{
                    padding: 24,
                    background: '#f8f8f8',
                    minHeight: 'calc(100vh - 128px)',
                }}
            >
                {children}
            </Content>
            <Footer />
        </>
    );
}
