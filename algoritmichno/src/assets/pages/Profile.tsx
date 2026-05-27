// src/assets/pages/Profile.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../../features/auth/context/AuthContext';

const Profile: React.FC = () => {
  const { user, completedLessons, testResult, logout } = useAuth();
  const navigate = useNavigate();

  const totalLessons = 4;
  const completedCount = completedLessons.length;
  const progress = Math.round((completedCount / totalLessons) * 100);

  const getTestResult = () => {
    if (testResult === null) 
      return { value: '—', color: '#64748b', label: 'Тест не пройден' };
    if (testResult >= 80) 
      return { value: `${testResult}%`, color: '#22c55e', label: 'Отличный результат!' };
    if (testResult >= 60) 
      return { value: `${testResult}%`, color: '#eab308', label: 'Хороший результат. Можно улучшить.' };
    return { value: `${testResult}%`, color: '#ef4444', label: 'Рекомендуем повторить материал.' };
  };

  const testInfo = getTestResult();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div className="p-20 text-center">Пожалуйста, войдите в аккаунт</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-6 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/90 border border-gray-700/60 backdrop-blur-xl rounded-3xl p-12">
          
          {/* Аватар */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold mb-6 shadow-2xl shadow-indigo-500/30">
              {(user.name || user.username || 'U')[0].toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold mb-2">{user.name || user.username}</h1>
            <p className="text-gray-400 text-lg">{user.email}</p>
          </div>

          {/* Три карточки статистики */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Пройдено уроков */}
            <div className="group relative p-8 rounded-2xl backdrop-blur-xl border-2 border-indigo-500/30 
                           bg-gradient-to-br from-indigo-900/40 via-black/70 to-black/80 
                           hover:shadow-2xl hover:shadow-indigo-500/30 hover:border-indigo-400/60 
                           transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent 
                             -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 text-center">
                <p className="text-6xl font-bold text-indigo-400 mb-2">{completedCount}</p>
                <p className="text-indigo-300/80">Пройдено уроков</p>
                <p className="text-sm text-indigo-300/50">из {totalLessons}</p>
              </div>
            </div>

            {/* Прогресс модуля */}
            <div className="group relative p-8 rounded-2xl backdrop-blur-xl border-2 border-emerald-500/30 
                           bg-gradient-to-br from-emerald-900/40 via-black/70 to-black/80 
                           hover:shadow-2xl hover:shadow-emerald-500/30 hover:border-emerald-400/60 
                           transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent 
                             -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 text-center">
                <p className="text-6xl font-bold text-emerald-400 mb-2">{progress}%</p>
                <p className="text-emerald-300/80">Прогресс модуля</p>
              </div>
            </div>

            {/* Результат теста */}
            <div className="group relative p-8 rounded-2xl backdrop-blur-xl border-2 border-purple-500/30 
                           bg-gradient-to-br from-purple-900/40 via-black/70 to-black/80 
                           hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400/60 
                           transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent 
                             -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative z-10 text-center">
                <p className="text-6xl font-bold mb-2" style={{ color: testInfo.color }}>
                  {testInfo.value}
                </p>
                <p className="text-purple-300/80">Результат теста</p>
              </div>
            </div>
          </div>

          {/* Сообщение о результате — в том же стиле */}
          <div className="group relative p-8 rounded-2xl backdrop-blur-xl border-2 border-gray-500/30 
                         bg-gradient-to-br from-gray-900/60 via-black/70 to-black/80 
                         hover:shadow-2xl hover:shadow-gray-500/30 hover:border-gray-400/60 
                         transition-all duration-500 overflow-hidden mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent 
                           -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative z-10 text-center">
              <p className="text-lg" style={{ color: testInfo.color }}>
                {testInfo.label}
              </p>
            </div>
          </div>

          {/* Кнопка выхода */}
          <Button 
            onClick={handleLogout}
            variant="outline" 
            size="lg" 
            className="w-full border-red-500/50 text-red-400 hover:bg-red-950/50 hover:border-red-500"
          >
            Выйти из аккаунта
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;