// src/features/auth/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  completedLessons: number[];
  testResult: number | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markLessonAsCompleted: (lessonId: number) => void;
  saveTestResult: (percentage: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [testResult, setTestResult] = useState<number | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedProgress = localStorage.getItem('completedLessons');
    const savedTest = localStorage.getItem('testResult');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProgress) setCompletedLessons(JSON.parse(savedProgress));
    if (savedTest) setTestResult(Number(savedTest));
  }, []);

  // Тестовые данные для входа
  const TEST_EMAIL = "kaevanika@gmail.com";
  const TEST_PASSWORD = "qwerty1";

  const login = async (email: string, password: string): Promise<boolean> => {
    // Проверка тестовых данных
    if (email.toLowerCase() === TEST_EMAIL && password === TEST_PASSWORD) {
      const mockUser: User = {
        id: 1,
        username: "kaevanika",
        email: TEST_EMAIL,
        name: "Вероника"
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }

    // Для других email — тоже разрешаем вход (для удобства тестирования)
    if (email && password) {
      const mockUser: User = {
        id: Date.now(),
        username: email.split('@')[0],
        email: email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }

    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    if (username && email && password) {
      const mockUser: User = {
        id: Date.now(),
        username,
        email,
        name: username
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setCompletedLessons([]);
    setTestResult(null);
    localStorage.removeItem('user');
    localStorage.removeItem('completedLessons');
    localStorage.removeItem('testResult');
  };

  const markLessonAsCompleted = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      const newProgress = [...completedLessons, lessonId];
      setCompletedLessons(newProgress);
      localStorage.setItem('completedLessons', JSON.stringify(newProgress));
    }
  };

  const saveTestResult = (percentage: number) => {
    setTestResult(percentage);
    localStorage.setItem('testResult', percentage.toString());
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      completedLessons,
      testResult,
      login,
      register,
      logout,
      markLessonAsCompleted,
      saveTestResult
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};