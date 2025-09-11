// src/pages/UserSignup.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const avatars = [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
    "https://i.pravatar.cc/100?img=5",
    "https://i.pravatar.cc/100?img=6",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
  };

  const navigate = useNavigate() ;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatar) {
      alert("Please select an avatar!");
      return;
    }
    console.log("Signup Data:", formData);
    // 👉 send formData to backend (axios.post("/api/signup", formData))
    const response = await axios.post("http://localhost:3001/student/signup" , formData) ;
    if (response.statusText == "OK"){
      console.log(response.data.message) ;
      navigate("/student/login") ;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          User Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Avatar Selection */}
          <div>
            <p className="text-gray-600 mb-2 font-medium">Choose an Avatar</p>
            <div className="grid grid-cols-3 gap-3">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`cursor-pointer rounded-full p-1 border-2 transition ${
                    formData.avatar === avatar
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
