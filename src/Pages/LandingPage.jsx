import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import HeroSection from '../Components/LandingPage/HeroSection'
import FeatureSection from '../Components/LandingPage/FeatureSection'
import Footer from '../Components/Shared/Footer'
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className='Landing-Page-container'>
        <Navbar/>
        <HeroSection/>
        <FeatureSection/>
        <Footer/>
    </div>
  )
}

export default LandingPage