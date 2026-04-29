// src/assets/pages/Lesson.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Lesson: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed] = useState(500);
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  const drawArray = (arr: number[], highlight: number[] = [], swapping: number[] = []) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / arr.length;
    const maxVal = Math.max(...arr);
    const maxHeight = canvas.height * 0.75;

    arr.forEach((value, index) => {
      const height = (value / maxVal) * maxHeight;
      const x = index * barWidth;
      const y = canvas.height - height;

      let color = '#64748b'; // обычный
      if (swapping.includes(index)) color = '#ef4444';     // обмен
      else if (highlight.includes(index)) color = '#3b82f6'; // сравнение

      ctx.fillStyle = color;
      ctx.fillRect(x + 8, y, barWidth - 16, height);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 15);
    });
  };

  const resetVisualization = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const initial = [64, 34, 25, 12, 22, 11, 90];
    setArray([...initial]);
    setIsPlaying(false);
    isPlayingRef.current = false;
    drawArray(initial);
  };

  const sleep = (ms: number) => {
    return new Promise<void>((resolve) => {
      timeoutRef.current = setTimeout(resolve, ms);
    });
  };

  const startBubbleSort = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    isPlayingRef.current = true;

    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1 && isPlayingRef.current; i++) {
      for (let j = 0; j < n - i - 1 && isPlayingRef.current; j++) {
        // Подсветка сравниваемых элементов
        drawArray(arr, [j, j + 1]);
        await sleep(speed);

        if (!isPlayingRef.current) break;

        if (arr[j] > arr[j + 1]) {
          // Подсветка обмениваемых элементов
          drawArray(arr, [], [j, j + 1]);
          await sleep(speed * 0.8);
          
          if (!isPlayingRef.current) break;
          
          // Выполняем обмен
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          drawArray(arr);
          await sleep(speed * 0.5);
        }
      }
    }

    // Финальная отрисовка
    if (isPlayingRef.current) {
      drawArray(arr);
    }
    
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const stopAnimation = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    drawArray(array);
  }, [array]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/course" className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block">
          ← Вернуться к курсу
        </Link>

        <h1 className="text-4xl font-bold mb-10 text-gray-900 dark:text-white">
          1. Сортировка пузырьком (Bubble Sort)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Левая колонка */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Теория</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Сортировка пузырьком — простой алгоритм, который сравнивает соседние элементы и меняет их местами, 
                если левый элемент больше правого. Самый большой элемент постепенно перемещается в конец массива.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Пример кода на Python</h2>
              <pre className="bg-gray-950 text-gray-100 p-6 rounded-2xl overflow-auto font-mono text-sm">
                <code>def bubble_sort(arr):<br />
    n = len(arr)<br />
    for i in range(n):<br />
        for j in range(0, n - i - 1):<br />
            if arr[j] &gt; arr[j + 1]:<br />
                arr[j], arr[j + 1] = arr[j + 1], arr[j]<br />
    return arr</code>
              </pre>
            </div>
          </div>

          {/* Правая колонка — Визуализация */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Визуализация алгоритма</h2>
            
            <div className="bg-gray-100 dark:bg-gray-950 rounded-2xl p-6 mb-8 flex justify-center min-h-[440px]">
              <canvas 
                ref={canvasRef} 
                width={820} 
                height={440} 
                className="rounded-xl"
              />
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={startBubbleSort} disabled={isPlaying} size="lg">
                Начать
              </Button>
              <Button onClick={stopAnimation} disabled={!isPlaying} variant="secondary" size="lg">
                Стоп
              </Button>
              <Button onClick={resetVisualization} variant="outline" size="lg">
                Заново
              </Button>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Скорость анимации: {speed} мс
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;