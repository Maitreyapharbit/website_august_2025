'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const Branding: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="branding" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Our Identity
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Logo Section */}
            <div className="text-center mb-16">
              <div className="inline-block modern-card p-12 mb-8">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-blue via-secondary-cyan to-secondary-teal rounded-2xl flex items-center justify-center network-node p-4">
                  <img 
                    src="/images/pharbit_(only_logo) copy copy.png" 
                    alt="Pharbit Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-primary-white mb-4">
                Pharbit
              </h3>
              <p className="text-xl text-secondary-cyan font-semibold">
                Secure Pharma Blockchain
              </p>
            </div>

            {/* Brand Story */}
            <div className="text-center modern-card p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-blue mb-6">
                The Future of Pharmaceutical Blockchain
              </h3>
              <p className="text-lg text-primary-white leading-relaxed mb-8 max-w-3xl mx-auto">
                By August 2026, Pharbit will establish the foundation for a revolutionary pharmaceutical ecosystem. 
                Our blockchain platform will ensure every medication's journey is transparent, secure, and verifiable, 
                protecting patients and empowering businesses across Germany.
              </p>
              
              {/* Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center modern-card p-6">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">10M</div>
                  <div className="text-primary-white">PHB Coins Goal</div>
                </div>
                <div className="text-center modern-card p-6">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">2026</div>
                  <div className="text-primary-white">Full Launch</div>
                </div>
                <div className="text-center modern-card p-6">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">∞</div>
                  <div className="text-primary-white">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branding;