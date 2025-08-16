'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const Benefits: React.FC = () => {
  const pharmaCompanyBenefits = [
    {
      icon: '🛡️',
      title: '99.9% Reduction in Fake Drugs',
      description: 'Virtually eliminate counterfeit drugs from entering your supply chain'
    },
    {
      icon: '💰',
      title: '30% Cost Reduction',
      description: 'Significant savings in supply chain management and operational costs'
    },
    {
      icon: '⏱️',
      title: '80% Time Savings',
      description: 'Automated regulatory reporting saves hours of manual work'
    },
    {
      icon: '📉',
      title: 'Lower Insurance Premiums',
      description: 'Reduced liability risks lead to lower insurance costs'
    },
    {
      icon: '🏆',
      title: 'Enhanced Brand Protection',
      description: 'Protect your brand reputation and build customer trust'
    }
  ];

  const patientBenefits = [
    {
      icon: '✅',
      title: 'Verified Authentic Medications',
      description: 'Guarantee that every medication is genuine and safe'
    },
    {
      icon: '🌡️',
      title: 'Properly Stored Medicines',
      description: 'Ensure medications maintain efficacy through proper storage'
    },
    {
      icon: '👁️',
      title: 'Complete Medication Journey Visibility',
      description: 'Full transparency from manufacturing to delivery'
    },
    {
      icon: '🔒',
      title: 'Supply Chain Integrity Confidence',
      description: 'Peace of mind knowing your medications are secure'
    }
  ];

  return (
    <section id="benefits" className="section bg-gradient-to-r from-green-900/10 to-blue-900/10">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">Benefits</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              Pharbit delivers measurable value to pharmaceutical companies while ensuring 
              patient safety and medication authenticity throughout the supply chain.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Pharmaceutical Companies Benefits */}
          <ScrollReveal animation="slideInLeft">
            <div className="glass-dark p-8 rounded-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="text-2xl font-bold text-white">For Pharmaceutical Companies</h3>
              </div>
              
              <div className="space-y-6">
                {pharmaCompanyBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-4 flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                      <p className="text-white opacity-80">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Patient Benefits */}
          <ScrollReveal animation="slideInRight">
            <div className="glass-dark p-8 rounded-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-white">For Patients</h3>
              </div>
              
              <div className="space-y-6">
                {patientBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-4 flex-shrink-0">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                      <p className="text-white opacity-80">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ROI Calculator */}
        <ScrollReveal animation="fadeInUp" delay={400}>
          <div className="mt-16">
            <div className="glass-dark p-8 rounded-xl max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Return on Investment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">300%</div>
                  <div className="text-white font-semibold">Average ROI</div>
                  <div className="text-sm text-white opacity-70">Within first year</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">6 months</div>
                  <div className="text-white font-semibold">Payback Period</div>
                  <div className="text-sm text-white opacity-70">Typical implementation</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">€2M+</div>
                  <div className="text-white font-semibold">Annual Savings</div>
                  <div className="text-sm text-white opacity-70">For mid-size companies</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Benefits;