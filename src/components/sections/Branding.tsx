'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const Branding: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  return (
    <section id="branding" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-network-pattern"></div>
      </div>

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
              <div className="inline-block glass-effect p-12 rounded-3xl mb-8">
                {/* Logo Placeholder - Will be replaced with actual logo */}
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-blue via-secondary-cyan to-secondary-teal rounded-2xl flex items-center justify-center network-node">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-white mb-2">P</div>
                    <div className="text-sm text-primary-white font-semibold tracking-wider">PHARBIT</div>
                  </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-blue">
                  The Name Behind the Innovation
                </h3>
                <p className="text-lg text-primary-white leading-relaxed">
                  <span className="text-secondary-cyan font-semibold">Pharbit</span> represents the fusion of 
                  <span className="text-primary-blue font-semibold"> pharmaceutical excellence</span> and 
                  <span className="text-secondary-cyan font-semibold"> blockchain technology</span>. 
                  Our name embodies our commitment to securing the pharmaceutical supply chain through innovative digital solutions.
                </p>
                <p className="text-lg text-primary-white leading-relaxed">
                  Future: <span className="text-secondary-cyan font-semibold">Pharbit (PHB) Crypto</span> - 
                  The next evolution in pharmaceutical blockchain transactions, creating a comprehensive ecosystem 
                  for secure, transparent, and efficient pharmaceutical commerce.
                </p>
              </div>

              <div className="glass-effect p-8 rounded-xl">
                <h4 className="text-xl font-bold text-primary-blue mb-6">Brand Values</h4>
                <div className="space-y-4">
                  {[
                    { icon: '🔒', title: 'Security', desc: 'Uncompromising data protection' },
                    { icon: '🔍', title: 'Transparency', desc: 'Complete supply chain visibility' },
                    { icon: '🚀', title: 'Innovation', desc: 'Cutting-edge blockchain solutions' },
                    { icon: '🤝', title: 'Trust', desc: 'Building reliable partnerships' },
                  ].map((value, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="text-2xl">{value.icon}</div>
                      <div>
                        <h5 className="text-secondary-cyan font-semibold">{value.title}</h5>
                        <p className="text-primary-white text-sm">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Future Vision */}
            <div className="text-center glass-effect p-12 rounded-2xl">
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
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">10M</div>
                  <div className="text-primary-white">PHB Coins Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">2026</div>
                  <div className="text-primary-white">Full Launch</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-secondary-cyan mb-2">∞</div>
                  <div className="text-primary-white">Possibilities</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Join the Pharbit Revolution
              </h3>
              <p className="text-primary-white mb-8 max-w-2xl mx-auto">
                Be part of the transformation that will reshape Germany's pharmaceutical industry. 
                Together, we're building a more secure, transparent, and efficient future.
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Branding;