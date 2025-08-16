'use client';

import React from 'react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const ProblemWeSolve: React.FC = () => {
  const problems = [
    {
      icon: '💀',
      title: 'Counterfeit Crisis',
      description: 'Over 1 million deaths annually from fake medications worldwide',
      impact: 'Critical'
    },
    {
      icon: '💰',
      title: 'Financial Impact',
      description: '$200+ billion in annual losses for pharmaceutical companies',
      impact: 'High'
    },
    {
      icon: '🔍',
      title: 'Supply Chain Opacity',
      description: 'Inability to track medications through complex distribution networks',
      impact: 'High'
    },
    {
      icon: '🌡️',
      title: 'Temperature Failures',
      description: '$35 billion in spoiled temperature-sensitive medicines yearly',
      impact: 'High'
    },
    {
      icon: '📋',
      title: 'Regulatory Complexity',
      description: 'Struggling to meet EU FMD serialization requirements',
      impact: 'Medium'
    },
    {
      icon: '🏥',
      title: 'Patient Safety',
      description: 'Lack of verification systems for drug authenticity',
      impact: 'Critical'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-400 bg-red-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <section id="problems" className="section bg-gradient-to-r from-red-900/10 to-orange-900/10">
      <div className="container">
        <div className="text-center mb-16">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-xl gradient-text mb-6">The Problems We Solve</h2>
            <p className="text-lg text-white opacity-90 max-w-3xl mx-auto">
              The pharmaceutical industry faces critical challenges that put patient lives at risk and cost billions in losses. 
              Pharbit addresses these fundamental issues with blockchain technology.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <ScrollReveal
              key={index}
              animation="fadeInUp"
              delay={index * 100}
            >
              <div className="glass-dark p-6 rounded-xl card-hover h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getImpactColor(problem.impact)}`}>
                    {problem.impact}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-white opacity-80 leading-relaxed">{problem.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal animation="fadeInUp" delay={600}>
          <div className="text-center mt-12">
            <div className="glass-dark p-8 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">The Cost of Inaction</h3>
              <p className="text-lg text-white opacity-90 leading-relaxed">
                Every day without proper pharmaceutical supply chain security means more counterfeit drugs enter the market, 
                more temperature-sensitive medicines are compromised, and more patients are put at risk. 
                The time for blockchain-based pharmaceutical security is now.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemWeSolve;