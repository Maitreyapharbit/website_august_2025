'use client';

import React, { useEffect, useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollReveal from '@/components/animations/ScrollReveal';

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden particles network-enhanced">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <ScrollReveal animation="fadeInUp" className="space-y-8">
          {/* Main Headline */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight float-slow">
            <span className="text-shimmer">Transforming Germany's</span>
            <br />
            <ScrollReveal animation="slideInLeft" delay={300}>
              <span className="text-primary-white">Pharmaceutical Industry</span>
            </ScrollReveal>
            <br />
            <ScrollReveal animation="slideInRight" delay={600}>
              <span className="text-secondary-cyan animate-glow">with Blockchain</span>
            </ScrollReveal>
          </h1>

          {/* Subtext */}
          <ScrollReveal animation="scaleIn" delay={900}>
            <p className="text-xl md:text-2xl text-primary-white mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 float-medium">
              Secure, Transparent, Future-Ready Solutions
            </p>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal animation="bounceIn" delay={1200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MagneticButton
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={scrollToMission}
              >
                Learn More
              </MagneticButton>
              
              <div className="flex items-center space-x-2 text-secondary-cyan magnetic">
                <div className="w-2 h-2 bg-secondary-cyan rounded-full animate-pulse"></div>
                <span className="text-sm">Launching 2026</span>
              </div>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-secondary-cyan rounded-full opacity-60 float-slow"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary-blue rounded-full opacity-40 float-medium"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-secondary-cyan rounded-full opacity-50 float-fast"></div>
        <div className="absolute bottom-60 right-10 w-5 h-5 bg-primary-blue rounded-full opacity-30 float-slow"></div>

        {/* Scroll Indicator */}
        <ScrollReveal animation="fadeInUp" delay={1500}>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce magnetic">
            <div className="w-6 h-10 border-2 border-secondary-cyan rounded-full flex justify-center glass-effect">
              <div className="w-1 h-3 bg-secondary-cyan rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      {/* Enhanced Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-darkBlue opacity-60 z-5"></div>
      
      {/* Additional Particle Layer */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-secondary-cyan rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-blue rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-secondary-cyan rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Hero;
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-darkBlue opacity-50 z-5"></div>
    </section>
  );
};

export default Hero;