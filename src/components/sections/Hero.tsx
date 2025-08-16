import React from 'react';
import Button from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative modern-section">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-primary-white mb-8 leading-tight">
            Transforming
            <span className="block text-gradient bg-gradient-to-r from-primary-blue via-secondary-cyan to-primary-blue bg-clip-text text-transparent animate-shimmer">
              Pharmaceutical
            </span>
            <span className="block text-primary-white">Blockchain</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-white mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            Secure, transparent, and future-ready blockchain solutions for Germany's pharmaceutical industry. 
            <span className="text-secondary-cyan font-semibold">Launching January–August 2026.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button size="large" className="px-12 py-4 text-lg font-semibold modern-card">
              Explore Our Vision
            </Button>
            <Button 
              variant="outline" 
              size="large" 
              className="px-12 py-4 text-lg font-semibold border-2 border-secondary-cyan text-secondary-cyan hover:bg-secondary-cyan hover:text-secondary-black transition-all duration-300"
            >
              View Timeline
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="modern-card p-6 text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-primary-white mb-2">Secure</h3>
              <p className="text-primary-white opacity-80">Blockchain-powered security for pharmaceutical supply chains</p>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-primary-white mb-2">Transparent</h3>
              <p className="text-primary-white opacity-80">Complete traceability from production to delivery</p>
            </div>
            <div className="modern-card p-6 text-center">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-primary-white mb-2">Future-Ready</h3>
              <p className="text-primary-white opacity-80">Smart contracts and IoT integration for tomorrow's needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};