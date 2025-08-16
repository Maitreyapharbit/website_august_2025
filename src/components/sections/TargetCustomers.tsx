'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const TargetCustomers: React.FC = () => {
  const customers = [
    {
      icon: '🏭',
      title: 'Small-Medium Pharmaceutical Manufacturers',
      description: '50-500 employees, €5M-50M revenue',
      details: [
        'Generic drug manufacturers',
        'Specialty pharmaceutical companies',
        'Contract manufacturing organizations',
        'Emerging biotech companies'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚚',
      title: 'Pharmaceutical Distributors',
      description: 'Regional and national distribution networks',
      details: [
        'Wholesale pharmaceutical distributors',
        'Cold chain logistics providers',
        'Regional distribution centers',
        'Third-party logistics companies'
      ],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: '🏥',
      title: 'Hospital Pharmacy Departments',
      description: 'Large medical facilities',
      details: [
        'University medical centers',
        'Regional hospital systems',
        'Specialty treatment centers',
        'Clinical research facilities'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💉',
      title: 'Specialty Drug Manufacturers',
      description: 'High-value biologics and vaccines',
      details: [
        'Vaccine manufacturers',
        'Biologics producers',
        'Oncology drug companies',
        'Rare disease treatment manufacturers'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="customers" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Target Customers</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Pharbit serves pharmaceutical companies across the supply chain, from manufacturers 
              to distributors, helping them secure their operations and protect patients.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {customers.map((customer, index) => (
            <ScrollReveal
              key={index}
              animation="fadeInUp"
              delay={index * 150}
            >
              <div className="glass-dark p-8 rounded-xl card-hover h-full">
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${customer.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <span className="text-2xl">{customer.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{customer.title}</h3>
                    <p className="text-purple-400 text-sm">{customer.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {customer.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-white opacity-90">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 flex-shrink-0"></span>
                      <span>{detail}</span>
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
              <h3 className="text-2xl font-bold text-white mb-6">Why These Customers Choose Pharbit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Industry Focus</h4>
                  <p className="text-white opacity-80 text-sm">
                    Deep understanding of pharmaceutical industry challenges and regulations
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Quick Implementation</h4>
                  <p className="text-white opacity-80 text-sm">
                    Rapid deployment with minimal disruption to existing operations
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Cost Effective</h4>
                  <p className="text-white opacity-80 text-sm">
                    Significant ROI through reduced counterfeiting and improved efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TargetCustomers;