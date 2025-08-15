'use client';

import React from 'react';

const Mission: React.FC = () => {
  return (
    <section id="mission" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                Pharbit is committed to transforming Germany's pharma industry with 
                <span className="text-secondary-cyan font-semibold"> transparent, secure blockchain technology</span> 
                over the next year.
              </p>
              
              <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                Using <span className="text-primary-blue font-semibold">smart contracts and IoT</span>, 
                we support small businesses and plan for future growth.
              </p>
              
              <p className="text-lg md:text-xl text-primary-white leading-relaxed">
                Our goal is a <span className="text-secondary-cyan font-semibold">robust blockchain by August 2026</span>, 
                with crypto as a future step.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: '🔒', title: 'Secure', desc: 'Blockchain security' },
                  { icon: '🔍', title: 'Transparent', desc: 'Full traceability' },
                  { icon: '🚀', title: 'Future-Ready', desc: 'Scalable solutions' },
                  { icon: '🤝', title: 'Supportive', desc: 'Small business focus' },
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="glass-effect p-4 rounded-lg card-hover"
                  >
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h3 className="text-secondary-cyan font-semibold">{feature.title}</h3>
                    <p className="text-primary-white text-sm">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="glass-effect p-8 rounded-2xl border-gradient">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center network-node">
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
                    <div className="text-center">
                      <div className="text-secondary-cyan font-bold text-xl">2025</div>
                      <div className="text-primary-white">Development</div>
                    </div>
                    <div className="text-center">
                      <div className="text-secondary-cyan font-bold text-xl">2026</div>
                      <div className="text-primary-white">Launch</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;