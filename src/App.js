import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from './Pages/DashboardPage';
import DataManagement from './Pages/DataManagement';
import { useContext } from 'react';
import SettingsPage from './Pages/SettingsPage';

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
