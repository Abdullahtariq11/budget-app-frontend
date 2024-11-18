import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from './Pages/DashboardPage';
import DataManagement from './Pages/DataManagement';
import { useContext } from 'react';
import SettingsPage from './Pages/SettingsPage';
import InitialSetupPage from './Pages/InitialSetupPage';
import ResetPassword from './Components/LoginPage/ResetPassword';

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
          <Route path="/DashboardPage" element={<DashboardPage/>}/>
          <Route path="/DataManagement" element={<DataManagement/>}/>
          <Route path="/SettingsPage" element={<SettingsPage/>}/>
          <Route path="/InitialSetupPage" element={<InitialSetupPage/>}/>
          <Route path='/ResetPassword' element={<ResetPassword/>}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
