import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/LoginPage" element={<LoginPage />}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
