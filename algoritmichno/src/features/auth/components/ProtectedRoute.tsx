import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Перенаправляем на страницу входа, сохраняя текущий URL
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;