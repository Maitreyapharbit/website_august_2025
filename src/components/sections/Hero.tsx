'use client';

import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline();
      
      // Hero text animations
      tl.from('.hero-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.supply-chain-visual', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.8');

      // Supply chain animation
      const supplyChainTl = window.gsap.timeline({ repeat: -1, delay: 2 });
      
      supplyChainTl
        .to('.medicine-icon', {
          x: 100,
          duration: 2,
          ease: 'power2.inOut'
        })
        .to('.blockchain-node', {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }, '-=1')
        .to('.medicine-icon', {
          x: 200,
          duration: 2,
          ease: 'power2.inOut'
        })
        .to('.patient-icon', {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }, '-=1')
        .to('.medicine-icon', {
          x: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center modern-section overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-blue rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-cyan rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-neonGreen rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="hero-title text-5xl lg:text-7xl font-black text-primary-white leading-tight mb-8">
              Revolutionizing
              <span className="block bg-gradient-to-r from-primary-blue via-secondary-cyan to-secondary-neonGreen bg-clip-text text-transparent">
                Pharma Supply Chains
              </span>
              <span className="block text-4xl lg:text-5xl font-bold text-primary-white opacity-90 mt-2">
                with Blockchain
              </span>
            </h1>
            
            <p className="hero-subtitle text-xl lg:text-2xl text-primary-white opacity-80 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Track, verify, and secure every step from manufacturing to delivery. 
              Ensure patient safety with unbreakable transparency.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Explore Use Cases
              </button>
              <button className="btn-secondary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 010 5H9m4.5-5H15a2.5 2.5 0 010 5h-1.5m-4-5v5m4-5v5" />
                </svg>
                View Demo
              </button>
            </div>
          </div>

          {/* Supply Chain Visual */}
          <div className="supply-chain-visual relative">
            <div className="modern-card p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-primary-white mb-8 text-center">Secure Supply Chain Journey</h3>
              
              {/* Visual Flow */}
              <div className="relative h-32 mb-8">
                {/* Path Line */}
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-primary-blue via-secondary-cyan to-secondary-neonGreen rounded-full transform -translate-y-1/2 opacity-60"></div>
                
                {/* Medicine Icon */}
                <div className="medicine-icon absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-secondary-neonGreen to-secondary-teal rounded-xl flex items-center justify-center shadow-lg animate-neon-pulse">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                
                {/* Blockchain Node */}
                <div className="blockchain-node absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                
                {/* Patient Icon */}
                <div className="patient-icon absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-secondary-cyan to-primary-blue rounded-xl flex items-center justify-center shadow-lg animate-neon-pulse">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Labels */}
              <div className="flex justify-between text-sm font-medium text-primary-white opacity-80">
                <span>Medicine</span>
                <span>Blockchain</span>
                <span>Patient</span>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-secondary-cyan border-opacity-20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-cyan">99.9%</div>
                  <div className="text-xs text-primary-white opacity-70">Authenticity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-blue">24/7</div>
                  <div className="text-xs text-primary-white opacity-70">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-neonGreen">Global</div>
                  <div className="text-xs text-primary-white opacity-70">Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-primary-white opacity-60">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-secondary-cyan border-opacity-40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-secondary-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;