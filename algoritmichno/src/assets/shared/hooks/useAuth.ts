// src/features/auth/hooks/useAuth.ts
import { useState } from 'react';

interface User {
  name: string;
  level?: number;
  // можно будет расширить позже
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return {
    isAuthenticated,
    user,
    isAdmin,
    login,
    logout,
  };
};