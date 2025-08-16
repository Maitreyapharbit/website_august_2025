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
                Our Mission
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto animate-glow"></div>
            </div>
          </ScrollReveal>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 float-slow">
              <ScrollReveal animation="slideInLeft" delay={200}>
                <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                  Pharbit is committed to transforming Germany's pharma industry with 
                  <span className="text-secondary-cyan font-semibold"> transparent, secure blockchain technology</span> 
                  over the next year.
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="slideInLeft" delay={400}>
                <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                  Using <span className="text-primary-blue font-semibold">smart contracts and IoT</span>, 
                  we support small businesses and plan for future growth.
                </p>
              </ScrollReveal>
              
              <ScrollReveal animation="slideInLeft" delay={600}>
                <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                  Our goal is a <span className="text-secondary-cyan font-semibold">robust blockchain by August 2026</span>, 
                  with crypto as a future step.
                </p>
              </ScrollReveal>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: '🔒', title: 'Secure', desc: 'Blockchain security' },
                  { icon: '🔍', title: 'Transparent', desc: 'Full traceability' },
                  { icon: '🚀', title: 'Future-Ready', desc: 'Scalable solutions' },
                  { icon: '🤝', title: 'Supportive', desc: 'Small business focus' },
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
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center network-node animate-glow magnetic">
                      <svg className="w-16 h-16 text-primary-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                  
                    <h3 className="text-2xl font-bold text-primary-blue">
                      Blockchain Innovation
                    </h3>
                  
                    <p className="text-primary-white">
                      Revolutionizing pharmaceutical supply chains with cutting-edge technology
                    </p>
                  
                    <div className="flex justify-center space-x-4 text-sm">
                      <div className="text-center magnetic">
                        <div className="text-secondary-cyan font-bold text-xl animate-pulse">2025</div>
                        <div className="text-primary-white">Development</div>
                      </div>
                      <div className="text-center magnetic">
                        <div className="text-secondary-cyan font-bold text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>2026</div>
                        <div className="text-primary-white">Launch</div>
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