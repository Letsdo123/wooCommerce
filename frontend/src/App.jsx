import React from 'react'
import './App.css'
import Header from './components/Header'
import Slider from './components/Slider'
import SignupForm from './components/SignupForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <div className=" bg-gray-50 flex items-center justify-center">
        <SignupForm />
      </div>
      <Footer/>
    </>
  )
}

export default App
