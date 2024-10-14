import React from 'react'
import Navbar from '../Components/Shared/Navbar'
import HeroSection from '../Components/LandingPage/HeroSection'
import FeatureSection from '../Components/LandingPage/FeatureSection'

function LandingPage() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <FeatureSection/>
    </div>
  )
}

export default LandingPage