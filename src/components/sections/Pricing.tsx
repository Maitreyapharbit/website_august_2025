'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Pricing: React.FC = () => {
  const packages = [
    {
      name: 'Starter Package',
      price: '€500',
      period: '/month',
      description: 'Perfect for small pharmaceutical companies getting started',
      features: [
        'Up to 1,000 tracked products monthly',
        'Basic temperature monitoring',
        'Standard compliance reporting',
        'Email support',
        'Basic dashboard access',
        'Mobile app access'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: 'Professional Package',
      price: '€2,500',
      period: '/month',
      description: 'Ideal for growing pharmaceutical companies',
      features: [
        'Up to 10,000 tracked products monthly',
        'Advanced IoT sensor integration',
        'Real-time alerts and notifications',
        'Priority phone support',
        'Custom dashboard features',
        'API access for integrations',
        'Advanced analytics',
        'Regulatory compliance automation'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Enterprise Package',
      price: '€10,000',
      period: '/month',
      description: 'Complete solution for large pharmaceutical operations',
      features: [
        'Unlimited tracked products',
        'Full IoT sensor deployment',
        'Dedicated account management',
        'Custom integration services',
        '24/7 premium support',
        'Advanced analytics and AI insights',
        'White-label options',
        'Multi-region deployment',
        'Custom compliance reporting',
        'Priority feature requests'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Pricing Packages</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Choose the perfect package for your pharmaceutical company. All plans include 
              blockchain security, IoT monitoring, and regulatory compliance features.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <ScrollReveal
              key={index}
              animation="fadeInUp"
              delay={index * 150}
            >
              <div className={`glass-dark p-8 rounded-xl card-hover h-full relative ${
                pkg.popular ? 'ring-2 ring-purple-500' : ''
              }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${pkg.color} rounded-full flex items-center justify-center mb-4`}>
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-white opacity-70 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{pkg.price}</span>
                    <span className="text-white opacity-70 ml-1">{pkg.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-white opacity-90">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105' 
                      : 'border-2 border-white/30 text-white hover:bg-white hover:text-black'
                  }`}>
                    {pkg.popular ? 'Start Free Trial' : 'Contact Sales'}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeInUp" delay={500}>
          <div className="mt-16 text-center">
            <div className="glass-dark p-8 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">All Plans Include</h3>
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
                  Need a custom solution? Contact our sales team for enterprise pricing and custom features.
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