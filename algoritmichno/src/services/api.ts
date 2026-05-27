// src/services/api.ts
const API_BASE_URL = 'http://localhost:5000/api'; // можно изменить позже

export const lessonService = {
  async getLessonById(id: string): Promise<any> {
    const mockLessons: any = {
      "1": {
        id: 1,
        title: "1. Сортировка пузырьком (Bubble Sort)",
        theory_text: "Сортировка пузырьком — один из самых простых алгоритмов сортировки. Он repeatedly проходит по массиву, сравнивает соседние элементы и меняет их местами, если они находятся в неправильном порядке.",
        python_code_example: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr`,
        visualization_config: { type: "bubble" }
      },
      "2": {
        id: 2,
        title: "2. Сортировка выбором (Selection Sort)",
        theory_text: "На каждом проходе находится минимальный элемент в неотсортированной части массива и меняется местами с первым элементом этой части.",
        python_code_example: `def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr`,
        visualization_config: { type: "selection" }
      },
      "3": {
        id: 3,
        title: "3. Сортировка вставками (Insertion Sort)",
        theory_text: "Алгоритм, который постепенно формирует отсортированную часть массива, вставляя каждый новый элемент в правильное место.",
        python_code_example: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`,
        visualization_config: { type: "insertion" }
      },
      "4": {
        id: 4,
        title: "4. Быстрая сортировка (Quick Sort)",
        theory_text: "Один из самых эффективных алгоритмов сортировки, основанный на принципе «разделяй и властвуй». Выбирает опорный элемент и разбивает массив на две части.",
        python_code_example: `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)`,
        visualization_config: { type: "quick" }
      }
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockLessons[id] || null), 300);
    });
  }
};