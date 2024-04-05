'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Result() {
  const searchParams = useSearchParams()

  const username = searchParams.get('username')
  const testId = searchParams.get('testId')

  return (
    <div>
      <h1>Result</h1>
      <p>Username: {username}</p>
      <p>TestId: {testId}</p>
    </div>
  )
}