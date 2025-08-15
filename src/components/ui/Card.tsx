import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div 
      className={`glass-effect p-6 rounded-xl border border-secondary-teal ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;