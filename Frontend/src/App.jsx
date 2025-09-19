// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useAuthContext } from './context/AuthContext.jsx';
// import Navbar from './components/Navbar'; 

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}
export default App;