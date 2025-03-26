import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  color?: '1' | '2' | '3' | '4' | '5' | '6';
  className?: string;
  icon?: ReactNode;
  animated?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'subtle',
  color = '1',
  className = '',
  icon,
  animated = false,
}) => {
  // Variants styling
  const variantStyles = {
    solid: `bg-kalrav-${color} text-white`,
    outline: `bg-transparent border border-kalrav-${color} text-kalrav-${color}`,
    subtle: `bg-kalrav-${color}/10 text-kalrav-${color}`,
  };

  const baseClasses = 'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium';

  return (
    <motion.span
      className={`${baseClasses} ${variantStyles[variant]} ${className}`}
      initial={animated ? { scale: 0.8, opacity: 0 } : undefined}
      animate={animated ? { scale: 1, opacity: 1 } : undefined}
      transition={animated ? { type: 'spring', stiffness: 500, damping: 20 } : undefined}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </motion.span>
  );
};

export default Badge;
