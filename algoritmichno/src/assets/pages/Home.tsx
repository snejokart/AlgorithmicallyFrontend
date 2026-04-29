// src/assets/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Алгоритмично
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Визуализация алгоритмов сортировки
          </p>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400 mb-12">
            Наблюдайте в реальном времени, как работают алгоритмы сортировки данных.<br />
            Изучайте теорию, примеры кода на Python и закрепляйте знания с помощью тестов.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/course">
              <Button size="lg" className="px-10 py-6 text-lg">
                Начать изучение курса
              </Button>
            </Link>
            
            <Link to="/login">
              <Button variant="secondary" size="lg" className="px-10 py-6 text-lg">
                Войти в аккаунт
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
            Что вы получите на платформе
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">📊</div>
              <h3 className="text-2xl font-semibold mb-4">Наглядная анимация</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Смотрите, как элементы массива перемещаются, сравниваются и сортируются в реальном времени.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">🐍</div>
              <h3 className="text-2xl font-semibold mb-4">Примеры кода на Python</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Изучайте чистую и понятную реализацию каждого алгоритма.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">✅</div>
              <h3 className="text-2xl font-semibold mb-4">Тесты на закрепление</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Проверяйте свои знания после прохождения модуля.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Начните понимать сортировки по-настоящему
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Переходите к изучению курса и наблюдайте за работой алгоритмов своими глазами
          </p>
          <Link to="/course">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-12 py-7 text-lg font-semibold"
            >
              Перейти к курсу
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;