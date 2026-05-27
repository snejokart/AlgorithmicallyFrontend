// src/assets/components/ui/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  className = '',
  ...props
}) => {
  const base = "group relative px-8 py-5 rounded-2xl backdrop-blur-xl border-2 shadow-2xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out overflow-hidden font-medium";

  const variants = {
    primary: "border-indigo-500/40 bg-gradient-to-br from-indigo-600 via-indigo-700 to-black/90 hover:border-indigo-400 hover:shadow-indigo-500/40 text-white",
    secondary: "border-purple-500/30 bg-gradient-to-br from-purple-900/60 via-black/80 to-black/90 hover:border-purple-400 hover:shadow-purple-500/30",
    outline: "border-gray-500/40 bg-black/40 hover:bg-gray-900/70 hover:border-gray-400"
  };

  const sizes = {
    sm: "px-6 py-3 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default Button;