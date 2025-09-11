import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

// --- SVG Icon Components for UI consistency ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;

// --- Reusable Input Component with Icon ---
const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input {...props} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" />
    </div>
);

export default function CounselorLogin({ name }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let response;
        const loginUrl = name === "Counselor" 
            ? "http://localhost:3001/counselor/login" 
            : "http://localhost:3001/student/login";

        response = await axios.post(loginUrl, formData);

        if (response.data) {
            // The backend should return the user object on successful login
            const userData = {
                ...response.data, // Assuming backend sends name, email etc.
                role: name // Add the role
            };
            login(userData); // Update the global state
            navigate("/"); // Redirect to homepage
        }
    } catch (error) {
        console.error("Login failed:", error);
        // Here you would typically show an error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-200">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{name} Login</h2>
            <p className="text-gray-500 mt-2">Welcome back! Please enter your details.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon icon={<MailIcon />} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <InputWithIcon icon={<LockIcon />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link to={name === "Counselor" ? "/counselor/signup" : "/student/signup"} className="font-medium text-teal-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

