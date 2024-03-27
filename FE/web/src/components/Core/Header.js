import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Header = () => {
    const router = useRouter()

    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        router.push("/login")
    }

    return (
        <header className='mb-20'>
            <div className='min-h-[50px] m-0 bg-[#bb2019] flex justify-between fixed top-0 w-full z-10'>
                <img src="../../assets/logo_ptit.png" className='bg-white size-[50px]' />
                <nav className='pl-0 mx-4 my-auto'>
                    <Link href='/dashboard' className='nav-item'> Trang chủ </Link>
                    <Link href='/profile' className='nav-item'> Hồ sơ </Link>
                    <Link href='/history' className='nav-item'> Lịch sử </Link>
                    <button className='nav-item mr-3' onClick={handleLogOut}> Đăng xuất </button>
                </nav>
            </div>
        </header>
    )
}

export default Header