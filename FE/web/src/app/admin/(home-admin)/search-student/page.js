'use client'

import { useRouter } from 'next/navigation'

export default function TestDetail() {
  const router = useRouter()

  const handleButtonClick = () => {
    router.push('/admin/search-student/detail?username=2&testId=231')
  }

  return (
    <button onClick={handleButtonClick}>
      View Result
    </button>
  )
}