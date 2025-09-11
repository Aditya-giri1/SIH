import React, { useState } from 'react';
import Header from './components/Header/Header';
import HomePage from './components/Pages/HomePage';
import FirstAidChat from './components/Pages/FirstAidChat';
import BookingSystem from './components/Pages/BookingSystem';
import ResourceHub from './components/Pages/ResourceHub';
import PeerForum from './components/Pages/PeerForum';
import AdminDashboard from './components/Pages/AdminDashboard';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <FirstAidChat />;
      case 'booking':
        return <BookingSystem />;
      case 'resources':
        return <ResourceHub />;
      case 'forum':
        return <PeerForum />;
      case 'dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="bg-gray-100 font-sans antialiased">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="min-h-[calc(100vh-4rem)]">
        {renderPage()}
      </main>
    </div>
  );
}