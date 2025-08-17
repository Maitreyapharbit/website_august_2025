'use client';

import React, { useEffect } from 'react';

const Hero: React.FC = () => {
  useEffect(() => {
    // GSAP Hero Animations
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline();
      
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-scroll', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');

      // Parallax effect
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      window.gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section id="home" className="hero-section h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated Background */}
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500 to-green-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="floating-shape absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg opacity-30"></div>
      <div className="floating-shape absolute top-3/4 right-1/4 w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full opacity-30" style={{ animationDelay: '-3s' }}></div>
      <div className="floating-shape absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg opacity-30" style={{ animationDelay: '-1s' }}></div>

      <div className="container text-center relative z-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Securing Pharmaceutical Supply Chains with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Blockchain Technology
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-blue-300 mb-12 font-semibold">
            Compliance, Transparency, Innovation
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="border-2 border-blue-400 text-blue-400 text-lg px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="hero-scroll absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-white opacity-70">
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;