import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NavList = ({ tabs, handleLogOut }) => {
    return (
        <nav className='pl-0 mx-4 my-auto'>
            {tabs.map((tab, index) => (
                tab.name === 'Đăng xuất' ? (
                    <button key={index} className='nav-item mr-3' onClick={() => handleLogOut(tab.path)}> Đăng xuất </button>
                ) : (
                    <Link href={tab.path} className='nav-item' key={index}> {tab.name} </Link>
                )
            ))}
        </nav>
    )
}

const Header = ({ tabs }) => {
    const router = useRouter()

    const handleLogOut = (back) => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        router.push(back)
    }

    return (
        <header className='mb-12'>
            <div className='min-h-[50px] m-0 bg-ptit flex justify-between fixed top-0 w-full z-10'>
                <img src="../../assets/logo_ptit.png" className='bg-white size-[50px]' />
                <NavList
                    tabs={tabs}
                    handleLogOut={handleLogOut}
                />
            </div>
        </header>
    )
}

export default Header