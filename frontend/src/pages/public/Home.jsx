import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Slider from '../../components/public/Slider'
import { useSelector } from 'react-redux'
import Agents from './Agents'

function Home() {
  const {user} = useSelector((state)=>state.auth)
  // checking the user details when user logged in
  useEffect(()=>{
    console.log("User details in home:",user);
  },[user])
  return (
    <main className='h-[calc(100vh-7rem)] bg-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200'>
        <Slider/>
        <Agents/>
        <Outlet/>
    </main>
  )
}

export default Home