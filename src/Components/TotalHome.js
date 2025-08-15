import React from 'react'
import HomePage from "../Components/HomePage"
import ServiceCards from "../Components/ServiceCards"
import About from "../Components/About"
import Footer from './Footer'

function TotalHome() {
  return (
    <>
    <HomePage/>
    <ServiceCards/>
    <About/>
    <Footer/>
    </>
  )
}

export default TotalHome