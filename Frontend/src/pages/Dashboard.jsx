// src/pages/DashboardPage.jsx
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Welcome, {authUser.name}!</h1>
            <p className="text-lg text-gray-600">Your role is: {authUser.role}</p>
            {/* We will build the rest of the dashboard here in the next phase */}
        </div>
    );
}
export default Dashboard;