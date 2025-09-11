// src/pages/CounselorLogin.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CounselorLogin({name}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate() ;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // 👉 Send formData to backend (e.g., axios.post("/api/counselors/login", formData))
    if (name == "Counselor"){
      const response = await axios.post("http://localhost:3001/counselor/login" , formData) ;
      if (response.statusText == "OK"){
      navigate("/") ;
    }
    }
    if (name == "Student"){
    const response = await axios.post("http://localhost:3001/student/login" , formData) ;
    if (response.statusText == "OK"){
      navigate("/") ;
    }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          {name} Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Extra links */}
        <p className="text-center text-gray-500 mt-4 text-sm">
          Don’t have an account?{" "}
          <a href={(name == "Counselor"? "/counselor/signup" : "/student/signup")} className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
