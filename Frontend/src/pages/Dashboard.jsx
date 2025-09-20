// src/pages/DashboardPage.jsx
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import HostDashboard from "./host/hostDashboard.jsx";
import VendorDashboard from "./vendor/VendorDashboard.jsx";

const Dashboard = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  console.log(authUser?.name);

  if (!authUser) {
    navigate("/login");
    return null; // Prevent rendering until redirect
  }

  async function logout(e) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/api/user/logout",
        {},
        { withCredentials: true }
      );

      // Clear user from localStorage + context
      localStorage.removeItem("event-user");
      setAuthUser(null);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {authUser?.name}!</h1>
      <p className="text-lg text-gray-600">Your role is: {authUser?.role}</p>

      <form onSubmit={logout}>
        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </form>
      {authUser?.role === 'host' ? <HostDashboard /> : <VendorDashboard />}
    
    </div>
  );
};

export default Dashboard;
