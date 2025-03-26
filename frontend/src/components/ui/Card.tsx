import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
  color?: 'default' | '1' | '2' | '3' | '4' | '5' | '6';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  color = 'default',
}) => {
  // Define color classes based on the color prop
  const colorClasses = {
    default: 'bg-white',
    '1': 'bg-kalrav-1/10 border-kalrav-1/30',
    '2': 'bg-kalrav-2/10 border-kalrav-2/30',
    '3': 'bg-kalrav-3/10 border-kalrav-3/30',
    '4': 'bg-kalrav-4/10 border-kalrav-4/30',
    '5': 'bg-kalrav-5/10 border-kalrav-5/30',
    '6': 'bg-kalrav-6/10 border-kalrav-6/30',
  };

  return (
    <motion.div
      className={`rounded-xl border border-gray-200 ${colorClasses[color]} shadow-sm p-4 ${className} ${
        hoverEffect
          ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer'
          : ''
      }`}
      whileHover={hoverEffect ? { y: -5 } : {}}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
