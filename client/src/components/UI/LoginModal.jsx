import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleModalClick = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-8 shadow-2xl max-w-sm w-full text-center"
        onClick={handleModalClick}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login As</h2>
        <div className="space-y-4">
          <Link
            to="/student/login"
            onClick={onClose}
            className="block w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-transform transform hover:scale-105"
          >
            Student
          </Link>
          <Link
            to="/counselor/login"
            onClick={onClose}
            className="block w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Counselor
          </Link>
          <Link
            to="/admin/login"
            onClick={onClose}
            className="block w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-transform transform hover:scale-105"
          >
            Admin
          </Link>
        </div>
        <p className="text-sm text-gray-600 mt-8">
          Don't have an account?{' '}
          <Link
            to="/student/signup"
            className="font-medium text-teal-600 hover:underline"
            onClick={onClose}
          >
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

// Optional component if you want to keep it in this file
const InputWithIcon = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
    />
  </div>
);

export default LoginModal;
