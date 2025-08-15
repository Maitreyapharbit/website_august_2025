'use client';

import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToMission = () => {
    const element = document.getElementById('mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Headline */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Transforming Germany's</span>
            <br />
            <span className="text-primary-white">Pharmaceutical Industry</span>
            <br />
            <span className="text-secondary-cyan">with Blockchain</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-primary-white mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Secure, Transparent, Future-Ready Solutions
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToMission}
              className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg animate-pulse-slow"
            >
              Learn More
            </button>
            
            <div className="flex items-center space-x-2 text-secondary-cyan">
              <div className="w-2 h-2 bg-secondary-cyan rounded-full animate-pulse"></div>
              <span className="text-sm">Launching 2026</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-secondary-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-secondary-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-darkBlue opacity-50 z-5"></div>
    </section>
  );
};

export default Hero;