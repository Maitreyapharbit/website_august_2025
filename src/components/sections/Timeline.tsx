'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const Timeline: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="timeline" className="relative py-20 lg:py-32 modern-section">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Road to Launch
            </h2>
            <p className="text-xl text-primary-white max-w-3xl mx-auto">
              Our strategic roadmap to revolutionize Germany's pharmaceutical industry
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-6"></div>
          </div>

          {/* Timeline Content */}
          <div className="max-w-4xl mx-auto">
            <div className="modern-card p-12 text-center">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Development Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4 modern-card p-6">
                  <div className="text-3xl font-bold text-secondary-cyan">Aug 2025</div>
                  <h4 className="text-lg font-semibold text-primary-white">Development Begins</h4>
                  <p className="text-primary-white text-sm">Initial blockchain development and smart contract creation</p>
                </div>
                <div className="space-y-4 modern-card p-6">
                  <div className="text-3xl font-bold text-secondary-cyan">Jan 2026</div>
                  <h4 className="text-lg font-semibold text-primary-white">Beta Testing</h4>
                  <p className="text-primary-white text-sm">First phase testing and pilot program launch</p>
                </div>
                <div className="space-y-4 modern-card p-6">
                  <div className="text-3xl font-bold text-secondary-cyan">Aug 2026</div>
                  <h4 className="text-lg font-semibold text-primary-white">Full Launch</h4>
                  <p className="text-primary-white text-sm">Complete platform deployment across Germany</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;