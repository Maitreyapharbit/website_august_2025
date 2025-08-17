'use client';

import React from 'react';

const Mission: React.FC = () => {
  return (
    <section id="vision" className="py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Vision
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto"></div>
          </div>

          {/* Vision Statement */}
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-12 rounded-2xl border border-gray-600">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                "A world where every pharmaceutical product is traceable, verifiable, and safe transforming healthcare through transparency and trust."
              </h3>
            </div>
          </div>

          {/* Mission Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8" data-aos="fade-right">
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Our Mission</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Pharbit is committed to transforming the global pharmaceutical industry with 
                  transparent, secure blockchain technology and IoT monitoring solutions.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
                <h4 className="text-xl font-bold text-green-400 mb-4">Our Technology</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Using smart contracts and IoT, we provide pharmaceutical companies with 
                  unbreakable supply chain security.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
                <h4 className="text-xl font-bold text-purple-400 mb-4">Our Goal</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our goal is to eliminate counterfeit drugs and ensure patient safety worldwide.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div data-aos="fade-left" className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-12 rounded-2xl border border-gray-600">
                <div className="text-center space-y-8">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">
                    Pharmaceutical Innovation
                  </h3>
                  
                  <p className="text-gray-300 text-lg">
                    Protecting patients through blockchain-verified authentic medications
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-blue-400 font-bold text-2xl">2025</div>
                      <div className="text-gray-300">Launch Year</div>
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold text-2xl">Global</div>
                      <div className="text-gray-300">Impact</div>
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