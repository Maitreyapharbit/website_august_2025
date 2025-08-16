'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
  animation = 'fadeInUp'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [delay, threshold]);

  const animationClass = isVisible ? `animate-${animation.replace(/([A-Z])/g, '-$1').toLowerCase()}` : 'opacity-0';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-800 ${animationClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;