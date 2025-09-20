// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({ name: '', email: '', password: '', role: 'host' });
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // IMPORTANT: Configure withCredentials to send the cookie
      console.log("Registration successful:", inputs);
      const res = await axios.post("http://localhost:3001/api/user/register", inputs, {
         withCredentials: true,
      });

      localStorage.setItem("event-user", JSON.stringify(res.data));
      setAuthUser(res.data);
      navigate('/dashboard'); // Redirect to dashboard on success

    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Here you can add logic to show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">
          Create Your Account
        </h2>
        {/* Input fields for name, email, password */}
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        />
        <select
          onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="host">I am a Host</option>
          <option value="vendor">I am a Vendor</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
