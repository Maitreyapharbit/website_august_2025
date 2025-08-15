'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import Logo from './Logo';

interface ResponsiveLogoProps {
  className?: string;
  href?: string;
  mobileSize?: 'sm' | 'md' | 'lg';
  desktopSize?: 'md' | 'lg' | 'xl';
  showTextOnMobile?: boolean;
}

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({
  className = '',
  href = '/',
  mobileSize = 'sm',
  desktopSize = 'md',
  showTextOnMobile = false,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Determine size based on screen
  let size: 'sm' | 'md' | 'lg' | 'xl';
  let showText: boolean;

  if (isMobile) {
    size = mobileSize;
    showText = showTextOnMobile;
  } else if (isTablet) {
    size = 'md';
    showText = true;
  } else {
    size = desktopSize;
    showText = true;
  }

  return (
    <Logo
      size={size}
      href={href}
      showText={showText}
      className={`transition-all duration-300 ${className}`}
    />
  );
};

export default ResponsiveLogo;