// src/assets/pages/Course.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

interface LessonItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
}

const Course: React.FC = () => {
  // Мок-данные (в будущем будут приходить из БД через API)
  const lessons: LessonItem[] = [
    {
      id: 1,
      title: "1. Сортировка пузырьком (Bubble Sort)",
      description: "Простейший алгоритм сортировки с наглядными обменами соседних элементов",
      duration: "15 мин",
      difficulty: "Начальный"
    },
    {
      id: 2,
      title: "2. Сортировка выбором (Selection Sort)",
      description: "Поиск минимального элемента и размещение его в начало массива",
      duration: "15 мин",
      difficulty: "Начальный"
    },
    {
      id: 3,
      title: "3. Сортировка вставками (Insertion Sort)",
      description: "Постепенное формирование отсортированной части массива",
      duration: "20 мин",
      difficulty: "Средний"
    },
    {
      id: 4,
      title: "4. Быстрая сортировка (Quick Sort)",
      description: "Эффективный алгоритм сортировки типа «разделяй и властвуй»",
      duration: "25 мин",
      difficulty: "Средний"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Заголовок курса */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Сортировка данных
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Интерактивный курс по алгоритмам сортировки с визуализацией и примерами кода на Python
          </p>
        </div>

        {/* Список уроков */}
        <div className="space-y-6 mb-16">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 
                         hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    Урок {lesson.id}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                    {lesson.duration}
                  </span>
                  <span className="px-4 py-1.5 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                    {lesson.difficulty}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {lesson.description}
                </p>
              </div>

              <div>
                <Link to={`/lesson/${lesson.id}`}>
                  <Button size="lg" className="min-w-[180px]">
                    Перейти к уроку
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Блок финального теста */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 border border-gray-100 dark:border-gray-800 text-center">
          <h3 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Финальный тест по модулю
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Проверьте, насколько хорошо вы усвоили материал по алгоритмам сортировки
          </p>
          <Button variant="primary" size="lg">
            Пройти итоговый тест
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Course;