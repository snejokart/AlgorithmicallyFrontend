// src/assets/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../../features/auth/context/AuthContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Валидация пароля
  const validatePassword = (pass: string): string => {
    if (pass.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    if (!/\d/.test(pass)) {
      return 'Пароль должен содержать хотя бы одну цифру';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Проверка полей
    if (!username || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    if (!agree) {
      setError('Необходимо согласиться с пользовательским соглашением');
      setLoading(false);
      return;
    }

    // Регистрация
    const success = await register(username, email, password);
    
    if (success) {
      navigate('/course');
    } else {
      setError('Ошибка при регистрации. Попробуйте другой email.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6 py-12">
      <div className="bg-gray-900 p-10 rounded-3xl border border-gray-700 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Создать аккаунт</h2>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-2xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2 text-gray-400">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="ivan123"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Придумайте пароль"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Минимум 6 символов, включая хотя бы одну цифру</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Повторите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
              placeholder="Повторите пароль"
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-5 h-5 accent-blue-600"
              required
            />
            <label className="text-sm text-gray-400 leading-relaxed">
              Я ознакомлен(а) и согласен(а) с{' '}
              <span className="text-blue-400 hover:underline cursor-pointer">пользовательским соглашением</span>
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;