import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Slider from '../../components/public/Slider'
import { useSelector } from 'react-redux'
import Agents from './Agents'
import GrowWithUsPage from './GrowWithUsPage'
import AllProducts from './products/AllProducts'

function Home() {
  const {user} = useSelector((state)=>state.auth)
  // checking the user details when user logged in
  useEffect(()=>{
    console.log("User details in home:",user);
  },[user])
  return (
    <main className=' bg-gray-100 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200'>
        <Slider/>
        <AllProducts/>
        <GrowWithUsPage/>
        <Outlet/>
    </main>
  )
}

export default Home