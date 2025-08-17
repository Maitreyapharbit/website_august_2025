'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: '🔗',
      title: 'Complete Drug Traceability',
      description: 'End-to-end visibility of every pharmaceutical product',
      details: [
        'Unique digital identity for every medicine batch',
        'Immutable record of manufacturing details',
        'Real-time tracking throughout supply chain',
        'Instant verification of product authenticity',
        'Complete audit trail from factory to patient'
      ]
    },
    {
      icon: '🌡️',
      title: 'Smart Temperature Monitoring',
      description: 'IoT-powered cold chain management and compliance',
      details: [
        'IoT sensors monitor temperature 24/7',
        'Instant alerts for cold chain violations',
        'Automated compliance reporting',
        'Historical temperature data storage',
        'Critical for vaccines, insulin, biologics'
      ]
    },
    {
      icon: '🛡️',
      title: 'Anti-Counterfeiting Protection',
      description: 'Blockchain-verified authenticity and tamper-proof records',
      details: [
        'Blockchain-verified product authenticity',
        'Tamper-proof digital signatures',
        'Real-time counterfeit detection',
        'Automated supplier verification',
        'Impossible to forge or duplicate records'
      ]
    },
    {
      icon: '📋',
      title: 'Regulatory Compliance Automation',
      description: 'Automated compliance with EU FMD and other regulations',
      details: [
        'EU FMD serialization compliance',
        'GDPR-compliant data handling',
        'Automated regulatory reporting',
        'Real-time audit capabilities',
        'Simplified inspection processes'
      ]
    },
    {
      icon: '🚨',
      title: 'Real-Time Alerts & Notifications',
      description: 'Instant notifications for critical supply chain events',
      details: [
        'Temperature breach notifications',
        'Shipment delay warnings',
        'Counterfeit product alerts',
        'Recall management automation',
        'Mobile app notifications for field staff'
      ]
    }
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Key Features</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Pharbit's comprehensive blockchain platform provides pharmaceutical companies with 
              the tools they need to secure their supply chains and protect patients.
            </p>
          </ScrollReveal>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              animation={index % 2 === 0 ? "slideInLeft" : "slideInRight"}
              delay={index * 200}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Feature Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="glass-dark p-8 rounded-xl">
                    <div className="flex items-center mb-6">
                      <div className="text-5xl mr-4">{feature.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-purple-400">{feature.description}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start text-white opacity-90">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Feature Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="glass-dark p-8 rounded-xl text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <span className="text-4xl">{feature.icon}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">Secure</span>
                      </div>
                      <div className="h-16 bg-gradient-to-r from-green-500/30 to-teal-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">Reliable</span>
                      </div>
                      <div className="h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">Fast</span>
                      </div>
                      <div className="h-16 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;