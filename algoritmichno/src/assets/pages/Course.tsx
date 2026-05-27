// src/assets/pages/Course.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../../features/auth/context/AuthContext';

const Course: React.FC = () => {
  const { completedLessons } = useAuth();

  const lessons = [
    { 
      id: 1, 
      title: "1. Сортировка пузырьком (Bubble Sort)", 
      desc: "Простейший алгоритм с наглядными обменами соседних элементов", 
      duration: "15 мин", 
      difficulty: "Начальный" 
    },
    { 
      id: 2, 
      title: "2. Сортировка выбором (Selection Sort)", 
      desc: "Поиск минимального элемента и размещение его в начало массива", 
      duration: "20 мин", 
      difficulty: "Начальный" 
    },
    { 
      id: 3, 
      title: "3. Сортировка вставками (Insertion Sort)", 
      desc: "Постепенное формирование отсортированной части массива", 
      duration: "25 мин", 
      difficulty: "Средний" 
    },
    { 
      id: 4, 
      title: "4. Быстрая сортировка (Quick Sort)", 
      desc: "Эффективный алгоритм сортировки типа «разделяй и властвуй»", 
      duration: "30 мин", 
      difficulty: "Средний" 
    },
  ];

  const completedCount = completedLessons.length;
  const isModuleCompleted = completedCount >= 4;

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Главный заголовок — всегда анимирован */}
        <div className="text-center mb-16">
          <h1 className="animated-gradient text-5xl md:text-6xl font-bold mb-4">
            Сортировка данных
          </h1>
          <p className="text-xl text-gray-400">Интерактивный курс по алгоритмам сортировки</p>
        </div>

        <div className="space-y-6 mb-20">
          {lessons.map((lesson) => (
            <Link 
              key={lesson.id} 
              to={`/lesson/${lesson.id}`}
              className="lesson-card group block bg-gray-900/80 border border-gray-700/60 backdrop-blur-xl rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-500 flex flex-col md:flex-row md:items-center gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-indigo-400 font-mono">Урок {lesson.id}</span>
                  <span className="px-5 py-1.5 bg-black/60 rounded-full text-sm border border-gray-700">{lesson.duration}</span>
                  <span className="px-5 py-1.5 bg-gradient-to-r from-amber-900 to-yellow-900/70 text-amber-300 rounded-full text-sm">{lesson.difficulty}</span>
                </div>

                {/* Главный заголовок урока — переливается только при наведении */}
                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:animated-gradient transition-all duration-300">
                  {lesson.title}
                </h3>

                <p className="text-gray-400">{lesson.desc}</p>
              </div>

              <div className="mt-4 md:mt-0">
                <Button>Перейти к уроку</Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Блок финального теста */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700/60 backdrop-blur-xl rounded-3xl p-12 text-center">
          <h2 className="animated-gradient text-3xl font-bold mb-6">
            Финальный тест по модулю
          </h2>
          <p className="text-gray-400 max-w-md mx-auto mb-10">
            Проверьте, насколько хорошо вы усвоили все алгоритмы сортировки
          </p>

          {isModuleCompleted ? (
            <Link to="/test">
              <Button size="lg">Пройти итоговый тест</Button>
            </Link>
          ) : (
            <div className="inline-flex items-center gap-4 px-10 py-5 bg-black/70 rounded-2xl border border-gray-700">
              <span className="text-3xl">🔒</span>
              <div className="text-left">
                <p className="text-amber-400 font-medium">Тест заблокирован</p>
                <p className="text-sm text-gray-500">Пройдите все 4 урока для разблокировки</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;