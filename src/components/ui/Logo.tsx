import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
  href?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true, 
  size = 'medium',
  href = '/'
}) => {
  const sizeClasses = {
    small: {
      logo: 'w-8 h-8',
      text: 'text-lg',
      container: 'space-x-2'
    },
    medium: {
      logo: 'w-10 h-10',
      text: 'text-xl',
      container: 'space-x-3'
    },
    large: {
      logo: 'w-12 h-12',
      text: 'text-2xl',
      container: 'space-x-4'
    }
  };

  const currentSize = sizeClasses[size];

  const LogoContent = () => (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      <div className={`relative ${currentSize.logo} transition-transform duration-300 hover:scale-110`}>
        <Image
          src="/images/pharbit-logo.png"
          alt="Pharbit Logo"
          width={48}
          height={48}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <span className={`text-primary-white font-bold ${currentSize.text} transition-colors duration-300 hover:text-secondary-cyan`}>
          Pharbit
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-secondary-cyan focus:ring-offset-2 focus:ring-offset-primary-darkBlue rounded-lg">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

export default Logo;