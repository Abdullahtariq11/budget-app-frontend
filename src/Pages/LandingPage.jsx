import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import HeroSection from '../Components/LandingPage/HeroSection'
import FeatureSection from '../Components/LandingPage/FeatureSection'
import Footer from '../Components/Shared/Footer'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <FeatureSection/>
        <Footer/>
    </div>
  )
}

export default LandingPage