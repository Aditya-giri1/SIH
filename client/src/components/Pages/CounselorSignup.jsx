import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --- SVG Icon Components for better UI ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const OfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m-1 4h1m6-12h1m-1 4h1m-1 4h1m-1 4h1" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// --- Reusable Input Component with Icon ---
const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input {...props} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" />
    </div>
);


export default function CounselorSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    clinicName: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // 👉 Send formData to backend (e.g., axios.post("/api/counselors", formData))
    const response = await axios.post("http://localhost:3001/counselor/signup", formData);
    if (response.statusText == "OK") {
      navigate("/counselor/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-200">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Counselor Account</h2>
            <p className="text-gray-500 mt-2">Join our platform and help students thrive.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* --- Personal Information --- */}
          <InputWithIcon icon={<UserIcon />} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <InputWithIcon icon={<MailIcon />} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <InputWithIcon icon={<LockIcon />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          
          {/* --- Clinic Information --- */}
          <div className="pt-4 border-t">
             <h3 className="text-lg font-semibold text-gray-700 mb-4">Clinic Details</h3>
             <div className="space-y-5">
                <InputWithIcon icon={<OfficeIcon />} type="text" name="clinicName" placeholder="Clinic or Institution Name" value={formData.clinicName} onChange={handleChange} required />
                <InputWithIcon icon={<LocationIcon />} type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleChange} required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputWithIcon icon={<LocationIcon />} type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <InputWithIcon icon={<LocationIcon />} type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                </div>
             </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{' '}
          <Link to="/counselor/login" className="font-medium text-teal-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
