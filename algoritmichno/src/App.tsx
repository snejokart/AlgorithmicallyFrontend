// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';

import Header from './assets/components/layout/Header';
import Home from './assets/pages/Home';
import Course from './assets/pages/Course';
import Lesson from './assets/pages/Lesson';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import Profile from './assets/pages/Profile';
import Test from './assets/pages/Test';

import ProtectedRoute from './features/auth/components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-950 text-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Защищённые маршруты */}
              <Route element={<ProtectedRoute />}>
                <Route path="/course" element={<Course />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test" element={<Test />} />
              </Route>

              {/* Перенаправление неизвестных маршрутов */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;