'use client';

import React, { useState, useEffect } from 'react';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  image: string;
  tags: string[];
}

const CaseStudiesCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const caseStudies: CaseStudy[] = [
    {
      id: 'pharma-giant-eu',
      title: 'European Pharmaceutical Giant Eliminates Counterfeits',
      company: 'EuroPharma Solutions',
      industry: 'Large-scale Manufacturing',
      challenge: 'Facing €50M annual losses from counterfeit drugs entering their supply chain across 15 European countries, with increasing regulatory pressure and patient safety concerns.',
      solution: 'Implemented Pharbit\'s comprehensive blockchain verification system with IoT sensors across all distribution centers, enabling real-time tracking and automated compliance reporting.',
      results: [
        'Eliminated 99.8% of counterfeit drugs from supply chain',
        'Reduced compliance reporting time by 75%',
        'Achieved full EU FMD compliance ahead of deadline',
        'Improved customer trust and brand reputation significantly',
        'Enabled real-time supply chain visibility across all markets'
      ],
      metrics: [
        { label: 'Counterfeit Reduction', value: '99.8%', improvement: '+99.8%' },
        { label: 'Cost Savings', value: '€48M', improvement: '+€48M' },
        { label: 'Compliance Time', value: '2 hours', improvement: '-75%' }
      ],
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Blockchain', 'EU FMD', 'Anti-Counterfeiting', 'IoT', 'Compliance']
    },
    {
      id: 'biotech-startup',
      title: 'Biotech Startup Secures Cold Chain for Cancer Drugs',
      company: 'OncoTech Biologics',
      industry: 'Specialty Biologics',
      challenge: 'Temperature-sensitive cancer medications worth €10M spoiled during transport due to cold chain failures, threatening patient treatments and company viability.',
      solution: 'Deployed Pharbit\'s advanced IoT temperature monitoring with real-time blockchain logging, automated alerts, and predictive analytics for proactive intervention.',
      results: [
        'Achieved 100% cold chain integrity across all shipments',
        'Reduced medication spoilage to absolute zero',
        'Automated regulatory compliance reporting',
        'Enabled real-time supply chain visibility',
        'Improved patient treatment continuity'
      ],
      metrics: [
        { label: 'Spoilage Reduction', value: '100%', improvement: '+100%' },
        { label: 'Savings', value: '€10M', improvement: '+€10M' },
        { label: 'Alert Response', value: '30 sec', improvement: '-95%' }
      ],
      image: 'https://images.pexels.com/photos/3786127/pexels-photo-3786127.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Cold Chain', 'Biologics', 'Temperature Monitoring', 'Alerts', 'Cancer Treatment']
    },
    {
      id: 'hospital-network',
      title: 'Hospital Network Streamlines Pharmaceutical Procurement',
      company: 'MedCenter Healthcare Network',
      industry: 'Healthcare Providers',
      challenge: 'Managing pharmaceutical inventory across 25 hospitals with frequent stockouts, expired medications, and complex procurement processes affecting patient care.',
      solution: 'Integrated Pharbit\'s supply chain visibility platform with automated inventory management, expiry tracking, and predictive analytics for optimal stock levels.',
      results: [
        'Reduced medication stockouts by 90%',
        'Eliminated expired medication waste completely',
        'Improved patient safety scores significantly',
        'Streamlined procurement processes across network',
        'Enhanced inventory turnover and cost efficiency'
      ],
      metrics: [
        { label: 'Stockout Reduction', value: '90%', improvement: '+90%' },
        { label: 'Waste Elimination', value: '€2.5M', improvement: '+€2.5M' },
        { label: 'Process Efficiency', value: '60%', improvement: '+60%' }
      ],
      image: 'https://images.pexels.com/photos/3786128/pexels-photo-3786128.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Hospital Network', 'Inventory Management', 'Patient Safety', 'Procurement', 'Analytics']
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % caseStudies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, caseStudies.length]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      // Animate slide transition
      const tl = window.gsap.timeline();
      
      tl.fromTo('.case-study-card', 
        { x: 100, opacity: 0, rotationY: -15 },
        { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out' }
      )
      .fromTo('.metric-card',
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.6'
      )
      .fromTo('.tag-item',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }
  }, [activeSlide]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % caseStudies.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
    setIsAutoPlaying(false);
  };

  const currentStudy = caseStudies[activeSlide];

  return (
    <section className="section modern-section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-primary-white opacity-90 max-w-4xl mx-auto leading-relaxed">
            Real-world implementations demonstrating the transformative power of blockchain 
            technology in pharmaceutical supply chains, delivering measurable results and enhanced patient safety
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-8 animate-glow"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Main Case Study Display */}
          <div className="case-study-card glass-immersive rounded-3xl p-12 mb-12 transform-gpu perspective-1000">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  {currentStudy.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag-item px-4 py-2 bg-gradient-to-r from-secondary-cyan/20 to-primary-blue/20 text-secondary-cyan text-sm font-bold rounded-full neon-border backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-primary-white mb-6 leading-tight">
                  {currentStudy.title}
                </h3>
                
                <div className="mb-8">
                  <p className="text-secondary-cyan font-bold text-lg mb-2">
                    {currentStudy.company}
                  </p>
                  <p className="text-primary-white opacity-80 font-medium">
                    {currentStudy.industry}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="glass-subtle p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-secondary-cyan mb-3 flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 animate-pulse"></span>
                      Challenge
                    </h4>
                    <p className="text-primary-white opacity-90 leading-relaxed">
                      {currentStudy.challenge}
                    </p>
                  </div>

                  <div className="glass-subtle p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-secondary-cyan mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                      Solution
                    </h4>
                    <p className="text-primary-white opacity-90 leading-relaxed">
                      {currentStudy.solution}
                    </p>
                  </div>

                  <div className="glass-subtle p-6 rounded-2xl">
                    <h4 className="text-xl font-bold text-secondary-cyan mb-4 flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                      Key Results
                    </h4>
                    <ul className="space-y-3">
                      {currentStudy.results.map((result, index) => (
                        <li key={index} className="flex items-start text-primary-white opacity-90">
                          <span className="w-3 h-3 bg-secondary-neonGreen rounded-full mr-4 mt-1 flex-shrink-0 animate-pulse"></span>
                          <span className="leading-relaxed">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={currentStudy.image}
                    alt={currentStudy.title}
                    className="w-full h-80 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deepBlue via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-immersive p-4 rounded-2xl">
                      <div className="text-secondary-cyan font-bold text-lg">
                        {currentStudy.company}
                      </div>
                      <div className="text-primary-white opacity-80">
                        {currentStudy.industry}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {currentStudy.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="metric-card glass-immersive p-8 rounded-2xl text-center card-hover-enhanced transform-gpu"
                >
                  <div className="text-5xl font-black section-title mb-3">
                    {metric.value}
                  </div>
                  <div className="text-primary-white font-bold text-lg mb-2">
                    {metric.label}
                  </div>
                  <div className="text-secondary-neonGreen font-semibold text-lg flex items-center justify-center">
                    <span className="mr-2">↗</span>
                    {metric.improvement}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevSlide}
              className="glass-immersive p-4 rounded-2xl hover:neon-border-enhanced transition-all duration-300 group"
            >
              <svg className="w-8 h-8 text-primary-white group-hover:text-secondary-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-4">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`transition-all duration-500 ${
                    index === activeSlide 
                      ? 'w-12 h-4 bg-secondary-cyan rounded-full animate-neon-pulse' 
                      : 'w-4 h-4 bg-gray-600 rounded-full hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="glass-immersive p-4 rounded-2xl hover:neon-border-enhanced transition-all duration-300 group"
            >
              <svg className="w-8 h-8 text-primary-white group-hover:text-secondary-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="glass-subtle px-6 py-3 rounded-full text-primary-white opacity-80 hover:opacity-100 text-sm transition-all duration-300 hover:neon-border"
            >
              {isAutoPlaying ? '⏸️ Pause Auto-play' : '▶️ Resume Auto-play'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCarousel;