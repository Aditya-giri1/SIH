import React, { useState, useEffect, useRef } from 'react';
import { icons } from '../../utils/icons';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'First-Aid Chat' },
    { id: 'booking', label: 'Booking' },
    { id: 'resources', label: 'Resources' },
    { id: 'forum', label: 'Peer Forum' },
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

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
             <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">{icons.chat}</div>
             <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight">Chaitanya</span>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`py-5 px-1 border-b-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
                    currentPage === item.id
                      ? 'border-teal-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </button>
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
                    <a href="#" onClick={() => { setCurrentPage('dashboard'); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Admin Login</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Student Login</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Counselor Login</a>
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