// src/assets/pages/Test.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../../features/auth/context/AuthContext';

const questions = [
  {
    id: 1,
    question: "Какой алгоритм сортировки считается самым простым для понимания?",
    options: ["Быстрая сортировка", "Сортировка пузырьком", "Сортировка выбором", "Сортировка вставками"],
    correct: 1
  },
  {
    id: 2,
    question: "Какой главный принцип работы сортировки выбором?",
    options: [
      "Сравнение соседних элементов",
      "Поиск минимального элемента и размещение его в начало",
      "Вставка элемента в отсортированную часть",
      "Разделение массива на две части"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Какой алгоритм использует принцип «разделяй и властвуй»?",
    options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Quick Sort"],
    correct: 3
  },
  {
    id: 4,
    question: "Что происходит при каждом проходе в сортировке пузырьком?",
    options: [
      "Самый маленький элемент перемещается в начало",
      "Самый большой элемент перемещается в конец",
      "Массив делится на две части",
      "Элементы случайным образом меняются местами"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "Какой алгоритм лучше всего подходит для почти отсортированных данных?",
    options: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"],
    correct: 2
  }
];

const Test: React.FC = () => {
  const { completedLessons, saveTestResult } = useAuth();
  const navigate = useNavigate();

  const totalLessons = 4;
  const isModuleCompleted = completedLessons.length >= totalLessons;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  if (!isModuleCompleted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-8 border border-gray-700">
            <span className="text-5xl">🔒</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Тест пока недоступен</h2>
          <p className="text-gray-400 text-lg mb-8">
            Чтобы открыть финальный тест, необходимо пройти все {totalLessons} уроков модуля.
          </p>

          <Link to="/course">
            <Button size="lg">Вернуться к урокам</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Подсчёт результата
      let correctAnswers = 0;
      selectedAnswers.forEach((answer, index) => {
        if (answer === questions[index].correct) correctAnswers++;
      });

      const percentage = Math.round((correctAnswers / questions.length) * 100);
      
      setScore(correctAnswers);
      saveTestResult(percentage);        // ← Сохраняем результат
      setShowResult(true);
    }
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-950 text-white py-12 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Тест завершён!</h2>
          
          <div className="text-8xl font-bold text-blue-400 mb-4">{percentage}%</div>
          <p className="text-2xl mb-10">
            {score} из {questions.length} правильных ответов
          </p>

          {percentage >= 80 ? (
            <p className="text-emerald-400 text-2xl mb-12">🎉 Отличный результат!</p>
          ) : percentage >= 60 ? (
            <p className="text-yellow-400 text-2xl mb-12">Хороший результат!</p>
          ) : (
            <p className="text-red-400 text-2xl mb-12">Рекомендуем повторить материал.</p>
          )}

          <div className="flex gap-4 justify-center">
            <Button onClick={restartTest} variant="secondary" size="lg">
              Пройти заново
            </Button>
            <Link to="/profile">
              <Button size="lg">Перейти в профиль</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Финальный тест по модулю</h1>
          <p className="text-gray-400 text-xl">
            Вопрос {currentQuestion + 1} / {questions.length}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-10 leading-relaxed">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-6 rounded-2xl border transition-all text-lg ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-900/40'
                    : 'border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <Button 
            onClick={handleNext} 
            disabled={selectedAnswers[currentQuestion] === -1}
            size="lg"
          >
            {currentQuestion === questions.length - 1 ? 'Завершить тест' : 'Следующий вопрос →'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;