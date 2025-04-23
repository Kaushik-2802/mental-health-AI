import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: '1' | '2' | '3' | '4' | '5' | '6';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  color = '1',
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon,
}) => {
  // Define variant classes
  const variantClasses = {
    primary: `bg-kalrav-${color} text-white hover:bg-kalrav-${color}/90`,
    secondary: `bg-kalrav-${color}/20 text-kalrav-${color} hover:bg-kalrav-${color}/30`,
    outline: `border border-kalrav-${color} text-kalrav-${color} hover:bg-kalrav-${color}/10`,
    ghost: `text-kalrav-${color} hover:bg-kalrav-${color}/10`,
  };

  // Define size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-kalrav-${color}/50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
        flex items-center justify-center gap-2
      `}
      whileTap={{ scale: 0.97 }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
