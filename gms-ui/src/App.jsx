// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import UserDashboard from './components/UserDashboard';
import AssigneeDashboard from './components/AssigneeDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import AllTechnicians from './components/AllTechnicians';
import RegisterTechnician from './components/RegisterTechnician';
import { AuthProvider } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import PageLoader from './components/PageLoader'; // New component for loading effect

function App() {
  return (
    <AuthProvider>
      <Router>
        <PageLoader /> {/* Handle loading spinner here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/assignee-dashboard" element={<AssigneeDashboard />} />
          <Route path="/all-technicians" element={<AllTechnicians />} />
          <Route path="/register-technician" element={<RegisterTechnician />} />
          <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
