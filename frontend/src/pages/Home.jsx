import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <main className='h-[calc(100vh-7rem)] bg-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200'>
        <p>This is home page</p>
        <Outlet/>
    </main>
  )
}

export default Home