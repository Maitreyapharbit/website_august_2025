'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Pharbit
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div data-aos="fade-right">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Pharbit is a pioneering pharmaceutical technology company that combines blockchain technology 
                with IoT sensors to create an unbreakable chain of custody for medicines from manufacturing 
                to patient delivery. Founded to address the critical global challenge of counterfeit drugs, 
                we provide pharmaceutical companies with cutting-edge solutions for supply chain 
                transparency, regulatory compliance, and patient safety.
              </p>
            </div>

            {/* Statistics */}
            <div data-aos="fade-left" className="space-y-8">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-xl border border-gray-600">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-red-400 mb-2">1M+</div>
                  <p className="text-gray-300 text-lg">Deaths Prevented Annually</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-xl border border-gray-600">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">€200B+</div>
                  <p className="text-gray-300 text-lg">Losses from Counterfeits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;