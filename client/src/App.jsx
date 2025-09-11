import React from 'react';
// 1. Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components with file extensions for clarity
import Header from './components/Header/Header.jsx';
import HomePage from './components/Pages/HomePage.jsx';
import FirstAidChat from './components/Pages/FirstAidChat.jsx';
import BookingSystem from './components/Pages/BookingSystem.jsx';
import ResourceHub from './components/Pages/ResourceHub.jsx';
import PeerForum from './components/Pages/PeerForum.jsx';
import AdminDashboard from './components/Pages/AdminDashboard.jsx';
import './App.css';
import CounselorSignup from './components/Pages/counsclersignup.jsx';
import CounselorLogin from './components/Pages/counselorlogin.jsx';

export default function App() {
  // 2. We no longer need useState or the renderPage function
  // const [currentPage, setCurrentPage] = useState('home');
  // const renderPage = () => { ... };

  return (
    // 3. Wrap your entire app in the Router component
    <Router>
      <div className="bg-gray-100 font-sans antialiased">
        {/* Header is outside of Routes, so it appears on every page */}
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">
          {/* 4. Use the Routes component to define all possible routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<FirstAidChat />} />
            <Route path="/booking" element={<BookingSystem />} />
            <Route path="/resources" element={<ResourceHub />} />
            <Route path="/forum" element={<PeerForum />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path='/counselor/signup' element={<CounselorSignup/>}/>
            <Route path='/counselor/login' element={<CounselorLogin name = "Counselor"/>}/>
            <Route path='/student/login' element={<CounselorLogin name = "Student"/>}/>
            {/* You can add more routes for student/counselor login here */}
            {/* e.g. <Route path="/login/student" element={<StudentLoginPage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

