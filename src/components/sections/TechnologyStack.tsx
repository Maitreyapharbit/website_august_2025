'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const TechnologyStack: React.FC = () => {
  const technologies = [
    {
      category: 'Blockchain Infrastructure',
      icon: '⛓️',
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        'ECDSA encryption and SHA-256 hashing',
        'Sharding and Layer-2 scaling solutions',
        'Smart Contracts for automated compliance',
        'Enterprise-grade Hyperledger Fabric'
      ]
    },
    {
      category: 'IoT Integration',
      icon: '📡',
      color: 'from-green-500 to-teal-500',
      technologies: [
        'Temperature, humidity, GPS, shock detection sensors',
        'WiFi, cellular, LoRaWAN protocols',
        '6-12 months battery life for mobile sensors',
        'Medical-grade, tamper-resistant hardware'
      ]
    },
    {
      category: 'Software Platform',
      icon: '💻',
      color: 'from-purple-500 to-pink-500',
      technologies: [
        'RESTful APIs for ERP integration',
        'iOS/Android apps for warehouse staff',
        'Real-time monitoring and analytics dashboard',
        'Scalable, secure cloud deployment',
        'AI-powered insights and predictions'
      ]
    }
  ];

  return (
    <section id="technology" className="section bg-gradient-to-r from-gray-900/50 to-black/50">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Technology Stack</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Built on cutting-edge blockchain and IoT technologies, Pharbit delivers enterprise-grade 
              security and reliability for global pharmaceutical supply chain management.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <ScrollReveal
              key={index}
              animation="fadeInUp"
              delay={index * 200}
            >
              <div className="glass-dark p-8 rounded-xl card-hover h-full">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-4 animate-pulse`}>
                    <span className="text-3xl">{tech.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.category}</h3>
                </div>
                
                <ul className="space-y-4">
                  {tech.technologies.map((technology, techIndex) => (
                    <li key={techIndex} className="flex items-start text-white opacity-90">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-sm leading-relaxed">{technology}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeInUp" delay={600}>
          <div className="mt-16 text-center">
            <div className="glass-dark p-8 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">Enterprise-Grade Architecture</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔒</div>
                  <div className="text-white font-semibold">Security First</div>
                  <div className="text-sm text-white opacity-70">Military-grade encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-white font-semibold">High Performance</div>
                  <div className="text-sm text-white opacity-70">Sub-second response times</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-white font-semibold">Scalable</div>
                  <div className="text-sm text-white opacity-70">Millions of transactions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-white font-semibold">Global Ready</div>
                  <div className="text-sm text-white opacity-70">Multi-region deployment</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TechnologyStack;