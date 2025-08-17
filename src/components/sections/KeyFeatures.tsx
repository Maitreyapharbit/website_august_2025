'use client';

import React from 'react';

const KeyFeatures: React.FC = () => {
  const features = [
    {
      title: 'Blockchain Security',
      description: 'Immutable ledger technology ensures complete data integrity and prevents tampering throughout the supply chain.',
      gradient: 'from-blue-500 to-blue-600',
      icon: '🔗'
    },
    {
      title: 'IoT Monitoring',
      description: 'Real-time sensor data tracking temperature, humidity, and location for optimal pharmaceutical storage conditions.',
      gradient: 'from-green-500 to-green-600',
      icon: '📡'
    },
    {
      title: 'Supply Chain Transparency',
      description: 'Complete visibility from manufacturing to patient delivery with detailed audit trails and verification.',
      gradient: 'from-purple-500 to-purple-600',
      icon: '🔍'
    },
    {
      title: 'Patient Safety',
      description: 'Eliminate counterfeit drugs and ensure medication authenticity to protect patient health worldwide.',
      gradient: 'from-orange-500 to-orange-600',
      icon: '🛡️'
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive blockchain solutions designed specifically for pharmaceutical supply chain security
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} p-8 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer group`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white opacity-90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;