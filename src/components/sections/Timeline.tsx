'use client';

import React, { useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  details: string[];
}

const timelineData: TimelineItem[] = [
  {
    date: 'August 2025',
    title: 'Development Begins',
    description: 'Initial blockchain development and smart contract creation',
    status: 'current',
    details: [
      'Core blockchain architecture design',
      'Smart contract development',
      'IoT integration planning',
      'Team expansion and partnerships'
    ]
  },
  {
    date: 'January 2026',
    title: 'Initial Milestone',
    description: 'First phase testing and pilot program launch',
    status: 'upcoming',
    details: [
      'Beta testing with select partners',
      'Supply chain integration tests',
      'Security audits and compliance',
      'User interface development'
    ]
  },
  {
    date: 'August 2026',
    title: 'Full Blockchain Launch',
    description: 'Complete platform deployment across Germany',
    status: 'upcoming',
    details: [
      'Full platform deployment',
      'Nationwide pharmaceutical integration',
      'Complete IoT sensor network',
      'Regulatory compliance certification'
    ]
  },
  {
    date: 'Future Goals',
    title: '10 Million PHB Coins',
    description: 'Cryptocurrency launch and ecosystem expansion',
    status: 'upcoming',
    details: [
      'PHB cryptocurrency launch',
      'Token economy implementation',
      'International expansion planning',
      'Advanced AI integration'
    ]
  }
];

const Timeline: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <section id="timeline" className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-darkBlue to-secondary-black">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Road to Launch
            </h2>
            <p className="text-xl text-primary-white max-w-3xl mx-auto">
              Our strategic roadmap to revolutionize Germany's pharmaceutical industry
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-6"></div>
          </div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
                    <div 
                      className={`w-6 h-6 rounded-full timeline-dot ${
                        item.status === 'current' ? 'active' : ''
                      } cursor-pointer transition-all duration-300 hover:scale-125`}
                      onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                    ></div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}
                  >
                    <div 
                      className={`glass-effect p-6 rounded-xl card-hover cursor-pointer transition-all duration-500 ${
                        selectedItem === index ? 'scale-105 shadow-2xl' : ''
                      }`}
                      onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                    >
                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span 
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'completed' 
                              ? 'bg-green-500 text-white'
                              : item.status === 'current'
                              ? 'bg-secondary-cyan text-secondary-black'
                              : 'bg-secondary-teal text-primary-white'
                          }`}
                        >
                          {item.status === 'completed' ? 'Completed' : 
                           item.status === 'current' ? 'In Progress' : 'Upcoming'}
                        </span>
                        <span className="text-secondary-cyan font-semibold">{item.date}</span>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl md:text-2xl font-bold text-primary-blue mb-3">
                        {item.title}
                      </h3>
                      <p className="text-primary-white mb-4">
                        {item.description}
                      </p>

                      {/* Expand/Collapse Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-secondary-cyan text-sm">
                          Click to {selectedItem === index ? 'collapse' : 'expand'} details
                        </span>
                        <svg 
                          className={`w-5 h-5 text-secondary-cyan transition-transform duration-300 ${
                            selectedItem === index ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Expanded Details */}
                      {selectedItem === index && (
                        <div className="mt-6 pt-6 border-t border-secondary-teal animate-slide-up">
                          <h4 className="text-secondary-cyan font-semibold mb-3">Key Milestones:</h4>
                          <ul className="space-y-2">
                            {item.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-secondary-cyan rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-primary-white text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="glass-effect p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Join Our Journey
              </h3>
              <p className="text-primary-white mb-6">
                Be part of the blockchain revolution in pharmaceutical industry
              </p>
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary px-8 py-3 rounded-lg font-semibold"
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;