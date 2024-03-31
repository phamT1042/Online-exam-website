'use client'

import React, { useEffect } from 'react'

const page = () => {
    
    useEffect(() => {
        document.title = "Trang chủ"
    }, [])

    return (
        <section>
            <h1> Dashboard </h1>
        </section>
    )
}

export default page