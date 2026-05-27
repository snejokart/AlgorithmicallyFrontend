// src/assets/components/common/AlgorithmVisualizer.tsx
import React, { useCallback, useEffect, useRef } from 'react';
import { playSound } from '../../../utils/sounds';

interface AlgorithmVisualizerProps {
  array: number[];
  highlight: number[];
  swapping: number[];
  sorted?: number[];
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  array,
  highlight = [],
  swapping = [],
  sorted = []
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawArray = useCallback((arr: number[], highlight: number[], swapping: number[], sorted: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const paddingLeft = 50;
    const paddingRight = 50;
    const paddingBottom = 85;
    const availableWidth = canvas.width - paddingLeft - paddingRight;
    const barWidth = Math.max(22, Math.floor(availableWidth / arr.length) - 12);
    const maxVal = Math.max(...arr, 1);
    const maxHeight = canvas.height - paddingBottom;

    arr.forEach((value, index) => {
      const height = (value / maxVal) * maxHeight;
      const x = paddingLeft + index * (barWidth + 12);
      const y = canvas.height - paddingBottom - height;

      let color = '#475569';
      if (sorted.includes(index)) color = '#22c55e';
      else if (swapping.includes(index)) color = '#ef4444';
      else if (highlight.includes(index)) color = '#3b82f6';

      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, '#1e2937');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, height);

      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(x + 4, y + height - 10, barWidth, 10);

      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 15px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 15);
    });
  }, []);

  useEffect(() => {
    drawArray(array, highlight, swapping, sorted);
  }, [array, highlight, swapping, sorted, drawArray]);

  return (
    <canvas
      ref={canvasRef}
      width={920}           // ← увеличил ширину
      height={520}          // ← увеличил высоту
      className="rounded-2xl shadow-inner w-full max-w-full"
    />
  );
};

export default AlgorithmVisualizer;