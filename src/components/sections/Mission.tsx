'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Mission: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="mission" className="relative py-20 lg:py-32 overflow-hidden modern-section">
      <div className="relative z-10 container mx-auto px-4">
        <div ref={ref}>
          {/* Section Title */}
          <ScrollReveal animation="fadeInUp" className="text-center mb-16">
            <div className="text-center mb-16">
              <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6 text-shimmer">
                Mission & Vision
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto animate-glow"></div>
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 float-slow">
              <ScrollReveal animation="slideInLeft" delay={200}>
                <div className="modern-card p-6">
                  <h3 className="text-2xl font-bold text-secondary-cyan mb-4">Our Vision</h3>
                  <p className="text-lg text-primary-white leading-relaxed">
                    A world where every pharmaceutical product is traceable, verifiable, and safe transforming healthcare through transparency and trust.
                  </p>
                </div>
              </ScrollReveal>
              
              <ScrollReveal animation="slideInLeft" delay={400}>
                <div className="modern-card p-6">
                  <h3 className="text-2xl font-bold text-secondary-cyan mb-4">Our Mission</h3>
                  <p className="text-lg text-primary-white leading-relaxed">
                    Pharbit is committed to transforming the global pharmaceutical industry with transparent, secure blockchain technology and IoT monitoring solutions. Using smart contracts and IoT, we provide pharmaceutical companies with unbreakable supply chain security. Our goal is to eliminate counterfeit drugs and ensure patient safety worldwide.
                  </p>
                </div>
              </ScrollReveal>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: '🔒', title: 'Secure', desc: 'Blockchain protection' },
                  { icon: '🔍', title: 'Traceable', desc: 'Complete visibility' },
                  { icon: '🌡️', title: 'Monitored', desc: 'IoT temperature control' },
                  { icon: '✅', title: 'Compliant', desc: 'Regulatory standards' },
                ].map((feature, index) => (
                  <ScrollReveal 
                    key={index}
                    animation="scaleIn" 
                    delay={800 + index * 100}
                  >
                    <div className="modern-card p-4 card-hover magnetic">
                      <div className="text-2xl mb-2 animate-bounce-in">{feature.icon}</div>
                      <h3 className="text-secondary-cyan font-semibold">{feature.title}</h3>
                      <p className="text-primary-white text-sm">{feature.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <ScrollReveal animation="slideInRight" delay={300}>
              <div className="relative float-medium">
                <div className="modern-card p-8 border-gradient card-hover">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center network-node animate-glow magnetic p-4">
                        <img 
                          src="/images/pharbit_(only_logo) copy copy.png" 
                          alt="Pharbit Logo" 
                          className="w-full h-full object-contain"
                        />
                      </svg>
                    </div>
                  
                    <h3 className="text-2xl font-bold text-primary-blue">
                      Pharmaceutical Security
                    </h3>
                  
                    <p className="text-primary-white">
                      Protecting patients through blockchain-verified authentic medications
                    </p>
                  
                    <div className="flex justify-center space-x-4 text-sm">
                      <div className="text-center magnetic">
                        <div className="text-secondary-cyan font-bold text-xl animate-pulse">2025</div>
                        <div className="text-primary-white">Beta Launch</div>
                      </div>
                      <div className="text-center magnetic">
                        <div className="text-secondary-cyan font-bold text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>2026</div>
                        <div className="text-primary-white">Full Launch</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;