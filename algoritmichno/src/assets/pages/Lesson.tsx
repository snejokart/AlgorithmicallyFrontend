// src/assets/pages/Lesson.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import AlgorithmVisualizer from '../components/common/AlgorithmVisualizer';
import { lessonService } from '../../services/api';
import { playSound } from '../../utils/sounds';
import { useAuth } from '../../features/auth/context/AuthContext';

interface LessonData {
  id: number;
  title: string;
  theory_text: string;
  python_code_example: string;
  visualization_config: { type: 'bubble' | 'selection' | 'insertion' | 'quick' };
}

const totalLessons = 4;

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { markLessonAsCompleted } = useAuth();

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(520);
  const [currentArray, setCurrentArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [highlight, setHighlight] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const timeoutRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  const currentLessonId = parseInt(id || '1');

  const goToPrevious = () => {
    if (currentLessonId > 1) navigate(`/lesson/${currentLessonId - 1}`);
  };

  const goToNext = () => {
    if (currentLessonId < totalLessons) navigate(`/lesson/${currentLessonId + 1}`);
  };

  useEffect(() => {
    const loadLesson = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await lessonService.getLessonById(id);
        setLesson(data);
        resetVisualization();
      } catch (error) {
        console.error("Ошибка загрузки урока:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLesson();
  }, [id]);

  const resetVisualization = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const initial = [64, 34, 25, 12, 22, 11, 90];
    setCurrentArray([...initial]);
    setHighlight([]);
    setSwapping([]);
    setSorted([]);
    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  // ==================== АНИМАЦИИ ====================
  const runBubbleSort = async (arr: number[]) => { /* ваш код */ };
  const runSelectionSort = async (arr: number[]) => { /* ваш код */ };
  const runInsertionSort = async (arr: number[]) => { /* ваш код */ };
  const runQuickSort = async (arr: number[]) => { /* ваш код */ };

  const finishWithGreenAnimation = async () => {
    playSound('success', 0.75);
    for (let i = 0; i < currentArray.length; i++) {
      if (!isPlayingRef.current) break;
      setSorted(prev => [...prev, i]);
      await new Promise(r => { timeoutRef.current = setTimeout(r, 140); });
    }
  };

  const startAnimation = async () => {
    if (isPlaying || !lesson) return;

    setIsPlaying(true);
    isPlayingRef.current = true;
    setSorted([]);
    let arr = [...currentArray];

    switch (lesson.visualization_config.type) {
      case 'bubble': await runBubbleSort(arr); break;
      case 'selection': await runSelectionSort(arr); break;
      case 'insertion': await runInsertionSort(arr); break;
      case 'quick': await runQuickSort(arr); break;
    }

    await finishWithGreenAnimation();
    markLessonAsCompleted(lesson.id);

    setIsPlaying(false);
    isPlayingRef.current = false;
  };

  const stopAnimation = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  if (loading) return <div className="p-20 text-center text-xl">Загрузка урока...</div>;
  if (!lesson) return <div className="p-20 text-center text-xl">Урок не найден</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/course" className="text-indigo-400 hover:text-indigo-300 mb-8 inline-block">
          ← Вернуться к курсу
        </Link>

        <h1 className="animated-gradient text-4xl md:text-5xl font-bold mb-12">
          {lesson.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Левая колонка — с адаптивной высотой */}
          <div className="flex flex-col h-full">
            {/* Теория */}
            <div className="bg-gray-900/80 border border-gray-700/60 backdrop-blur-xl rounded-3xl p-8 mb-6">
              <h2 className="animated-gradient text-2xl font-semibold mb-6">Теория</h2>
              <p className="text-gray-300 leading-relaxed">{lesson.theory_text}</p>
            </div>

            {/* Пример кода — занимает всё оставшееся пространство */}
            <div className="flex-1 bg-gray-900/80 border border-gray-700/60 backdrop-blur-xl rounded-3xl p-8 flex flex-col">
              <h2 className="animated-gradient text-2xl font-semibold mb-6">Пример кода на Python</h2>
              <pre className="bg-gray-950 border border-gray-700 rounded-2xl p-6 overflow-auto font-mono text-sm text-gray-100 flex-1">
                <code>{lesson.python_code_example}</code>
              </pre>
            </div>

            {/* Кнопки навигации — всегда внизу */}
            <div className="flex gap-4 mt-8">
              <Button 
                onClick={goToPrevious} 
                disabled={currentLessonId === 1}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                ← Предыдущий урок
              </Button>

              <Button 
                onClick={goToNext} 
                disabled={currentLessonId === totalLessons}
                size="lg"
                className="flex-1"
              >
                Следующий урок →
              </Button>
            </div>
          </div>

          {/* Правая колонка — Визуализация */}
          <div className="bg-gray-900/80 border border-gray-700/60 backdrop-blur-xl rounded-3xl p-8 flex flex-col">
            <h2 className="animated-gradient text-2xl font-semibold mb-6">Визуализация алгоритма</h2>
            
            <div className="flex-1 bg-[#0f172a] rounded-2xl p-8 mb-8 flex justify-center items-center min-h-[520px] border border-gray-800">
              <AlgorithmVisualizer 
                array={currentArray} 
                highlight={highlight}
                swapping={swapping}
                sorted={sorted}
              />
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={startAnimation} disabled={isPlaying} size="lg">
                Начать
              </Button>
              <Button onClick={stopAnimation} disabled={!isPlaying} variant="secondary" size="lg">
                Стоп
              </Button>
              <Button onClick={resetVisualization} variant="outline" size="lg">
                Заново
              </Button>
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
              <span className="text-gray-400 text-sm">Скорость анимации:</span>
              <input 
                type="range" 
                min="200" 
                max="1400" 
                step="50"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-56 accent-indigo-500"
              />
              <span className="tabular-nums w-16 text-gray-400">{speed} мс</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;