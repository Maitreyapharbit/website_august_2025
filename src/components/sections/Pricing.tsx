'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Pricing Packages</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Our comprehensive pricing packages are being finalized to provide the best value 
              for pharmaceutical companies of all sizes.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="fadeInUp" delay={200}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-dark p-16 rounded-xl">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <span className="text-5xl">🚀</span>
              </div>
              <h3 className="text-4xl font-bold text-white mb-6">Coming Soon</h3>
              <p className="text-xl text-white opacity-80 mb-8 leading-relaxed">
                We're crafting the perfect pricing packages for pharmaceutical companies of all sizes. 
                Our comprehensive plans will include blockchain security, IoT monitoring, and regulatory 
                compliance features tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Get Notified
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeInUp" delay={400}>
          <div className="mt-16 text-center">
            <div className="glass-dark p-8 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">All Plans Will Include</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-white font-semibold">Blockchain Security</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="text-white font-semibold">Mobile Apps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-white font-semibold">Analytics Dashboard</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-white font-semibold">Global Deployment</div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-white opacity-80">
                  Interested in early access or custom solutions? Contact our team to discuss your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;