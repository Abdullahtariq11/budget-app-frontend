import React, { useContext, useEffect } from 'react';
import "./DashboardPage";
import Navbar from '../Components/Shared/Navbar';
import Footer from '../Components/Shared/Footer';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../Components/DashboardPage/DashboardHeader';
import StatsOverview from '../Components/DashboardPage/StatsOverview';
import Card from '../Components/DashboardPage/Card';

function DashboardPage() {
  const {user,isAuthenticated}=useContext(AuthContext);
  const navigate=useNavigate();
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/LoginPage"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className='DashboardPage-container'>
        <Navbar/>
        <DashboardHeader/>
        <div className="dashboard-content">
          <Card/>
          <StatsOverview/>
        </div>
        <Footer/>
    </div>

  )
}

export default DashboardPage