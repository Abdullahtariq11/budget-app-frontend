import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from './Pages/DashboardPage';
import DataManagement from './Pages/DataManagement';

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
