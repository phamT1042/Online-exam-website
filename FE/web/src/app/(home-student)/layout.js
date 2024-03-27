'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "@/components/Core/Header";
import Footer from "@/components/Core/Footer";

export default function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token && token === null) {
            router.replace('/login');
        }
    }, []);

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
