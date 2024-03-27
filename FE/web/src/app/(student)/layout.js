'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && token !== null) {
            router.push('/dashboard');
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
}
