import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Using absolute paths from the project root to ensure files are found
import { AuthProvider } from '/src/components/context/AuthContext.jsx'; 
import Header from '/src/components/Header/Header.jsx';
import HomePage from '/src/components/Pages/HomePage.jsx';
import FirstAidChat from '/src/components/Pages/FirstAidChat.jsx';
import BookingSystem from '/src/components/Pages/BookingSystem.jsx';
import ResourceHub from '/src/components/Pages/ResourceHub.jsx';
import PeerForum from '/src/components/Pages/PeerForum.jsx';
import AdminDashboard from '/src/components/Pages/AdminDashboard.jsx';
import CounselorSignup from '/src/components/Pages/CounselorSignup.jsx';
import CounselorLogin from '/src/components/Pages/CounselorLogin.jsx';
import StudentSignup from '/src/components/Pages/StudentSignup.jsx';
import '/src/App.css';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 font-sans antialiased">
          <Header />
          <main className="min-h-[calc(100vh-4rem)]">
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
              <Route path='/admin/signup' element={<StudentSignup/>}/> 
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

