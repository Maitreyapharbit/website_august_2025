'use client';

import React, { useEffect, useRef } from 'react';

interface TimelineStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SupplyChainTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const stages: TimelineStage[] = [
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      description: 'Raw materials verified and products manufactured with blockchain timestamps',
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'packaging',
      title: 'Packaging',
      description: 'Products sealed with tamper-evident packaging and IoT sensors attached',
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'distribution',
      title: 'Distribution',
      description: 'Cold chain logistics with GPS tracking and temperature monitoring',
      color: 'from-purple-500 to-purple-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'retail',
      title: 'Retail',
      description: 'Pharmacy verification and inventory management with blockchain records',
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'patient',
      title: 'Patient',
      description: 'Final verification and safe delivery to patients with complete audit trail',
      color: 'from-cyan-500 to-cyan-600',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Animate timeline stages on scroll
      window.gsap.fromTo('.timeline-stage', 
        { 
          y: 60,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate connection lines
      window.gsap.fromTo('.connection-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Complete Supply Chain
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Transparency
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Follow every pharmaceutical product through its complete journey with blockchain-verified checkpoints and real-time monitoring.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start relative">
              {/* Connection Lines */}
              {stages.slice(0, -1).map((_, index) => (
                <div
                  key={index}
                  className="connection-line absolute top-16 h-1 bg-gradient-to-r from-slate-200 to-slate-300 origin-left"
                  style={{
                    left: `${(100 / (stages.length - 1)) * index + (100 / (stages.length - 1)) * 0.1}%`,
                    width: `${100 / (stages.length - 1) * 0.8}%`
                  }}
                />
              ))}

              {stages.map((stage, index) => (
                <div key={stage.id} className="timeline-stage flex-1 max-w-xs">
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${stage.color} rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 relative z-10`}>
                      {stage.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{stage.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {stages.map((stage, index) => (
              <div key={stage.id} className="timeline-stage flex items-start gap-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${stage.color} rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                  {stage.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{stage.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">100% Verified</h4>
            <p className="text-slate-600 text-sm">Every product authenticated through blockchain verification</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-2xl">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Real-time Tracking</h4>
            <p className="text-slate-600 text-sm">Live monitoring with IoT sensors and GPS tracking</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-2xl">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Tamper-proof</h4>
            <p className="text-slate-600 text-sm">Immutable records prevent counterfeiting and fraud</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainTimeline;