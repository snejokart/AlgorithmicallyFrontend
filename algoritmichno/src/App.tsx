// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './assets/components/layout/Header';
import Home from './assets/pages/Home';
import Course from './assets/pages/Course';
import Lesson from './assets/pages/Lesson';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course" element={<Course />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/login" element={<div className="p-20 text-center text-xl">Страница входа — в разработке</div>} />
            <Route path="/register" element={<div className="p-20 text-center text-xl">Страница регистрации — в разработке</div>} />
            <Route path="/profile" element={<div className="p-20 text-center text-xl">Профиль — в разработке</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;