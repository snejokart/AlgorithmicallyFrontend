// src/assets/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-28 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="animated-gradient text-6xl md:text-7xl font-bold leading-tight mb-6">
            Алгоритмично
          </h1>
          <p className="text-2xl text-gray-400 mb-6">
            Визуализация алгоритмов сортировки
          </p>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-500 mb-12">
            Наблюдайте в реальном времени, как работают алгоритмы сортировки.<br />
            Изучайте теорию, код на Python и закрепляйте знания тестами.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/course">
              <Button size="lg" className="px-12 py-7 text-lg">
                Начать курс
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="px-12 py-7 text-lg">
                Войти
              </Button>
            </Link>
          </div>
        </div>

        {/* Анимированные круги справа */}
        <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute w-20 h-20 bg-red-500 rounded-full shadow-2xl animate-circle1"></div>
            <div className="absolute w-20 h-20 bg-yellow-500 rounded-full shadow-2xl animate-circle2"></div>
            <div className="absolute w-20 h-20 bg-blue-500 rounded-full shadow-2xl animate-circle3"></div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-16 animated-gradient">
            Что вы получите
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/60 border border-gray-700 rounded-3xl p-10 hover:border-indigo-500/50 transition-all">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Наглядная анимация</h3>
              <p className="text-gray-400">Смотрите, как алгоритмы работают в реальном времени.</p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 rounded-3xl p-10 hover:border-indigo-500/50 transition-all">
              <div className="text-6xl mb-6">🐍</div>
              <h3 className="text-2xl font-semibold mb-4">Код на Python</h3>
              <p className="text-gray-400">Чистые и понятные реализации алгоритмов.</p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 rounded-3xl p-10 hover:border-indigo-500/50 transition-all">
              <div className="text-6xl mb-6">✅</div>
              <h3 className="text-2xl font-semibold mb-4">Тесты</h3>
              <p className="text-gray-400">Закрепляйте знания после каждого модуля.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;