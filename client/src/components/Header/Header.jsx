import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// --- CORRECTED IMPORT PATH ---
// The path now goes up one level from 'Header' to 'components', then into 'context'
import { useAuth } from '../context/AuthContext.jsx'; 
import LoginModal from '../UI/LoginModal.jsx';

// --- Icon Components ---
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const Header = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth(); 

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'First-Aid Chat' },
    { path: '/booking', label: 'Booking' },
    { path: '/resources', label: 'Resources' },
    { path: '/forum', label: 'Peer Forum' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };
  
  const getInitials = (name = "") => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
              <div className="bg-teal-100 text-teal-600 p-2 rounded-lg"><ChatIcon /></div>
              <span className="ml-3 text-24xl font-bold text-gray-800 tracking-tight">Chaitanya</span>
            </Link>
            <div className="hidden md:flex items-center">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`py-5 px-1 border-b-2 text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'border-teal-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <div className="ml-8 relative" ref={dropdownRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setProfileDropdownOpen(p => !p)}
                      className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded-full text-gray-600 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      {getInitials(user?.name)}
                    </button>
                    {isProfileDropdownOpen && (
                       <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                         <div className="py-1">
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                           <Link to="/my-appointments" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Appointments</Link>
                           <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                             Logout
                           </button>
                         </div>
                       </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="flex items-center py-5 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none"
                  >
                    <span>Login</span>
                    <span className="ml-1"><ChevronDownIcon /></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};

export default Header;

