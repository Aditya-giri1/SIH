import React, { useState, useEffect, useRef } from 'react';
// 1. Import Link and useLocation from react-router-dom
import { Link, useLocation } from 'react-router-dom';

// Note: I'm defining icons here for simplicity. You can keep your import from '../../utils/icons'
const icons = {
  chat: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
  chevronDown: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
};

// 2. Remove currentPage and setCurrentPage from the component's props
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // 3. Get the current page's location
  const location = useLocation();

  // 4. Change 'id' to 'path' to better represent a URL route
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
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const closeDropdown = () => {
      setIsDropdownOpen(false);
  }

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 5. Replace the div with a Link component for the logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
             <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">{icons.chat}</div>
             <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Chaitanya</span>
          </Link>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* 6. Replace the navigation buttons with Link components */}
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  // 7. Use location.pathname to check for the active page
                  className={`py-5 px-1 border-b-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    location.pathname === item.path
                      ? 'border-teal-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Dropdown Section */}
            <div className="ml-8 relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center py-5 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 focus:outline-none"
              >
                <span>Login</span>
                <span className="ml-1">{icons.chevronDown}</span>
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {/* 8. Replace anchor tags with Link components in the dropdown */}
                    <Link to="/admin" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Admin Login</Link>
                    <Link to="/login/student" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Student Login</Link>
                    <Link to="/login/counselor" onClick={closeDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Counselor Login</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

