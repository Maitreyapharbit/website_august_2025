'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'md',
  href = '/'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configurations
  const sizeConfig = {
    sm: { width: 32, height: 32, textSize: 'text-sm' },
    md: { width: 40, height: 40, textSize: 'text-xl' },
    lg: { width: 48, height: 48, textSize: 'text-2xl' },
    xl: { width: 56, height: 56, textSize: 'text-3xl' }
  };

  const { width, height, textSize } = sizeConfig[size];

  const LogoContent = () => (
    <div 
      className={`flex items-center space-x-2 group cursor-pointer transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Image */}
      <div className="relative">
        <Image
          src="/images/pharbit-logo.png"
          alt="Pharbit Logo"
          width={width}
          height={height}
          className={`transition-all duration-300 ${
            isHovered ? 'scale-110 drop-shadow-lg' : 'scale-100'
          }`}
          priority
        />
        {/* Hover overlay effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-secondary-cyan/20 rounded-lg transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-bold text-primary-white transition-all duration-300 ${textSize} ${
          isHovered ? 'text-secondary-cyan' : ''
        }`}>
          Pharbit
        </span>
      )}
    </div>
  );

  // If href is provided, wrap in Link component
  if (href) {
    return (
      <Link href={href} className="block">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default Logo;