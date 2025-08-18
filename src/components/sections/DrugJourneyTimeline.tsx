'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
  position: number;
}

const DrugJourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const timelineSteps: TimelineStep[] = [
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      description: 'Drug production with blockchain verification',
      icon: '🏭',
      details: [
        'Raw material verification',
        'Production batch recording',
        'Quality control checkpoints',
        'Blockchain timestamp creation',
        'Digital certificate generation'
      ],
      color: '#018ee8',
      position: 0
    },
    {
      id: 'packaging',
      title: 'Packaging & Labeling',
      description: 'Secure packaging with IoT sensors',
      icon: '📦',
      details: [
        'Tamper-evident packaging',
        'IoT sensor integration',
        'QR code generation',
        'Serialization compliance',
        'Temperature sensor activation'
      ],
      color: '#01ffff',
      position: 1
    },
    {
      id: 'warehouse',
      title: 'Warehouse Storage',
      description: 'Controlled environment monitoring',
      icon: '🏢',
      details: [
        'Climate-controlled storage',
        'Inventory management',
        'Real-time monitoring',
        'Automated alerts',
        'Blockchain status updates'
      ],
      color: '#39ff14',
      position: 2
    },
    {
      id: 'distribution',
      title: 'Distribution',
      description: 'Cold chain logistics with GPS tracking',
      icon: '🚚',
      details: [
        'GPS location tracking',
        'Temperature monitoring',
        'Route optimization',
        'Delivery confirmation',
        'Chain of custody updates'
      ],
      color: '#667eea',
      position: 3
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Receipt',
      description: 'Verification and inventory integration',
      icon: '🏥',
      details: [
        'Product authentication',
        'Inventory integration',
        'Expiry date verification',
        'Storage compliance',
        'Dispensing preparation'
      ],
      color: '#764ba2',
      position: 4
    },
    {
      id: 'patient',
      title: 'Patient Delivery',
      description: 'Final verification and patient safety',
      icon: '👤',
      details: [
        'Final authentication check',
        'Patient identity verification',
        'Dosage confirmation',
        'Safety information',
        'Treatment completion'
      ],
      color: '#ffd700',
      position: 5
    }
  ];

  // Animation logic
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && timelineRef.current) {
      setIsAnimating(true);

      // Calculate the x position for the active step
      const stepWidth = window.innerWidth;
      const targetX = -activeStep * stepWidth;

      // Animate the timeline container
      window.gsap.to(timelineRef.current, {
        x: targetX,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => setIsAnimating(false)
      });

      // Animate the active step
      const activeStepElement = `.timeline-step-${activeStep}`;
      
      // Reset all steps
      window.gsap.set('.timeline-step', { opacity: 0.3, scale: 0.95 });
      window.gsap.set('.step-details li', { opacity: 0, x: -30 });
      window.gsap.set('.tag-item', { scale: 0, opacity: 0 });

      // Animate active step
      const tl = window.gsap.timeline();
      
      tl.to(activeStepElement, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(`${activeStepElement} .step-details li`, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4')
      .to(`${activeStepElement} .tag-item`, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.3');

    }
  }, [activeStep, timelineSteps.length]);

  // Navigation functions
  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < timelineSteps.length && !isAnimating) {
      setActiveStep(stepIndex);
    }
  };

  const nextStep = () => {
    if (!isAnimating) {
      const nextIndex = (activeStep + 1) % timelineSteps.length;
      goToStep(nextIndex);
    }
  };

  const prevStep = () => {
    if (!isAnimating) {
      const prevIndex = activeStep === 0 ? timelineSteps.length - 1 : activeStep - 1;
      goToStep(prevIndex);
    }
  };

  const currentStep = timelineSteps[activeStep];

  return (
    <section ref={containerRef} className="section modern-section overflow-hidden relative">
      <div className="container mb-16">
        <div className="text-center">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
            Drug Journey Timeline
          </h2>
          <p className="text-xl text-primary-white opacity-90 max-w-4xl mx-auto leading-relaxed">
            Follow a pharmaceutical product's complete journey from manufacturing to patient delivery, 
            secured by blockchain technology and monitored by IoT sensors at every step
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-8 animate-glow"></div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative h-screen flex items-center">
        <div ref={timelineRef} className="flex items-center will-change-transform" style={{ width: `${timelineSteps.length * 100}vw` }}>
          {timelineSteps.map((step, index) => (
            <div
              key={step.id}
              className={`timeline-step timeline-step-${index} flex-shrink-0 w-screen flex items-center justify-center px-8`}
            >
              <div className="max-w-4xl w-full">
                <div className="glass-immersive p-12 rounded-3xl transform-gpu perspective-1000">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Step Icon and Title */}
                    <div className="text-center lg:text-left">
                      <div 
                        className="w-32 h-32 mx-auto lg:mx-0 rounded-3xl flex items-center justify-center mb-8 animate-neon-pulse transform-gpu"
                        style={{ 
                          backgroundColor: `${step.color}20`, 
                          border: `3px solid ${step.color}`,
                          boxShadow: `0 0 30px ${step.color}40`
                        }}
                      >
                        <span className="text-6xl">{step.icon}</span>
                      </div>
                      
                      <h3 className="text-4xl font-bold text-primary-white mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-xl text-primary-white opacity-90 leading-relaxed mb-8">
                        {step.description}
                      </p>

                      {/* Step Number */}
                      <div className="flex items-center justify-center lg:justify-start">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl text-primary-white"
                          style={{ 
                            backgroundColor: step.color,
                            boxShadow: `0 0 20px ${step.color}60`
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="ml-4 text-left">
                          <div className="text-secondary-cyan font-bold">Step {index + 1}</div>
                          <div className="text-primary-white opacity-70 text-sm">of {timelineSteps.length}</div>
                        </div>
                      </div>
                    </div>

                    {/* Step Details */}
                    <div className="glass-subtle p-8 rounded-2xl">
                      <h4 className="text-2xl font-bold text-secondary-cyan mb-6 flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-3 animate-pulse"
                          style={{ backgroundColor: step.color }}
                        ></span>
                        Key Activities
                      </h4>
                      
                      <ul className={`step-details step-details-${index} space-y-4`}>
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start text-primary-white opacity-90">
                            <span 
                              className="w-4 h-4 rounded-full mr-4 mt-1 flex-shrink-0 animate-pulse"
                              style={{ backgroundColor: step.color }}
                            ></span>
                            <span className="leading-relaxed font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technology Indicators */}
                      <div className="mt-8 flex flex-wrap gap-3">
                        <span className="tag-item px-4 py-2 bg-gradient-to-r from-primary-blue/20 to-secondary-cyan/20 text-secondary-cyan text-sm font-bold rounded-full border border-secondary-cyan/30">
                          🔗 Blockchain
                        </span>
                        <span className="tag-item px-4 py-2 bg-gradient-to-r from-secondary-neonGreen/20 to-secondary-teal/20 text-secondary-neonGreen text-sm font-bold rounded-full border border-secondary-neonGreen/30">
                          📡 IoT Sensors
                        </span>
                        <span className="tag-item px-4 py-2 bg-gradient-to-r from-secondary-purple/20 to-secondary-pink/20 text-secondary-purple text-sm font-bold rounded-full border border-secondary-purple/30">
                          📋 Smart Contracts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-immersive p-6 rounded-3xl">
          <div className="flex items-center space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevStep}
              disabled={isAnimating}
              className="glass-subtle p-4 rounded-2xl hover:neon-border-enhanced transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-primary-white group-hover:text-secondary-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Step Indicators */}
            <div className="flex space-x-3">
              {timelineSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  disabled={isAnimating}
                  className={`transition-all duration-500 disabled:cursor-not-allowed ${
                    index === activeStep 
                      ? 'w-12 h-4 bg-secondary-cyan rounded-full animate-neon-pulse' 
                      : 'w-4 h-4 bg-gray-600 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextStep}
              disabled={isAnimating}
              className="glass-subtle p-4 rounded-2xl hover:neon-border-enhanced transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6 text-primary-white group-hover:text-secondary-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Current Step Info */}
          <div className="mt-4 text-center">
            <div className="text-secondary-cyan font-bold text-lg">
              {currentStep.title}
            </div>
            <div className="text-primary-white opacity-70 text-sm">
              Step {activeStep + 1} of {timelineSteps.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrugJourneyTimeline;