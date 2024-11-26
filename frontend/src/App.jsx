import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import DynamicModal from './components/DynamicModal'
import ToastNotification from './utils/toastNotofication.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <ToastNotification/>
      <Header />
      <DynamicModal />
      <Outlet/>
      <Footer />
    </>
  )
}

export default App
