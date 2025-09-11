import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --- SVG Icon Components for a consistent UI ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const AcademicCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422A12.083 12.083 0 0121 18c0 1.097-.5 2.1-1.2 2.8L12 23l-7.8-4.2C3.5 18.1 3 17.1 3 16a12.083 12.083 0 012.84-6.422L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v9" /></svg>;

// --- Reusable Input Component with Icon ---
const InputWithIcon = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
        </div>
        <input {...props} className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow" />
    </div>
);

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    major: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Student Signup Data:", formData);
    // Send data to your student signup backend endpoint
    // const response = await axios.post("http://localhost:3001/student/signup", formData);
    // if (response.statusText === "OK") {
    //   navigate("/student/login");
    // }
    alert("Signup Submitted! (Demo)");
    navigate('/student/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-md border border-gray-200">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Student Account</h2>
            <p className="text-gray-500 mt-2">Get access to all our wellness resources.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputWithIcon icon={<UserIcon />} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <InputWithIcon icon={<MailIcon />} type="email" name="email" placeholder="University Email Address" value={formData.email} onChange={handleChange} required />
          <InputWithIcon icon={<LockIcon />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          
          <div className="pt-4 border-t">
             <div className="space-y-5">
                <InputWithIcon icon={<AcademicCapIcon />} type="text" name="studentId" placeholder="Student ID" value={formData.studentId} onChange={handleChange} required />
                <InputWithIcon icon={<AcademicCapIcon />} type="text" name="major" placeholder="Major / Course of Study" value={formData.major} onChange={handleChange} required />
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
          <Link to="/student/login" className="font-medium text-teal-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
