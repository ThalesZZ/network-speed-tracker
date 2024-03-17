import Api from '@/services/api'
import React from 'react'

export default async function Home(): Promise<React.ReactElement> {
  const data = await Api.speedlog.data()

  return (
    <main>
      <ul>
        {data.map((speedlog) => (
          <li key={speedlog._id}>{speedlog._id}</li>
        ))}
      </ul>
    </main>
  )
}
