// src/App.jsx or wherever your routing is defined
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import UserDashboard from './components/UserDashboard'; // Import your components
import AssigneeDashboard from './components/AssigneeDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import { AuthProvider } from './context/AuthContext';
import TechnicianRegistration from './components/TechnicianRegistration';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* HomePage set to root path */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/assignee-dashboard" element={<AssigneeDashboard />} />
        <Route path="/register-technician" element={<TechnicianRegistration />} />
        <Route path="/technician-dashboard" element={<TechnicianDashboard />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
