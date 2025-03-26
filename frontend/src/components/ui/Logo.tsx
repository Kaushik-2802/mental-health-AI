import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  // Size classes for the logo
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  // Text size classes
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div
        initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
        whileHover={{ scale: 1.05, rotate: -5 }}
        className={`${sizeClasses[size]} relative`}
      >
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="#AC6AFF" opacity="0.2" />

          {/* Brain stylized icon */}
          <path
            d="M30,50 Q40,30 50,50 Q60,70 70,50"
            stroke="#AC6AFF"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M35,40 Q45,60 55,40 Q65,20 75,40"
            stroke="#AC6AFF"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Sound waves / Vibrations representing "Kalrav" (birdsong) */}
          <path
            d="M25,50 Q15,50 15,60"
            stroke="#FF98E2"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M25,50 Q15,50 15,40"
            stroke="#FF98E2"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M75,50 Q85,50 85,60"
            stroke="#FF98E2"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M75,50 Q85,50 85,40"
            stroke="#FF98E2"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {withText && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className={`font-bold ${textSizeClasses[size]} bg-clip-text text-transparent bg-gradient-to-r from-kalrav-1 to-kalrav-6`}>
            Kalrav
          </span>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
