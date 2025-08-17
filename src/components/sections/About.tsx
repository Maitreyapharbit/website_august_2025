'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid grid-2 items-center gap-16">
          {/* Text Content */}
          <div data-aos="fade-right">
            <h2 className="text-xl gradient-text mb-8">About Pharbit</h2>
            <p className="text-lg text-white opacity-90 mb-8 leading-relaxed">
              Pharbit is a pioneering pharmaceutical technology company that combines blockchain technology 
              with IoT sensors to create an unbreakable chain of custody for medicines from manufacturing 
              to patient delivery. Founded to address the critical global challenge of counterfeit drugs, 
              we provide German pharmaceutical companies with cutting-edge solutions for supply chain 
              transparency, regulatory compliance, and patient safety.
            </p>
            
            <div className="grid grid-2 gap-6">
              <div className="glass-dark p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">1M+</h3>
                <p className="text-purple-400">Deaths Prevented Annually</p>
              </div>
              <div className="glass-dark p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">€200B+</h3>
                <p className="text-purple-400">Losses from Counterfeits</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div data-aos="fade-left" className="relative">
            <div className="glass-dark p-8 rounded-xl">
              <div className="grid grid-2 gap-4 mb-6">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-80 flex items-center justify-center">
                  <span className="text-white font-bold text-sm text-center">Blockchain<br/>Security</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg opacity-80 flex items-center justify-center">
                  <span className="text-white font-bold text-sm text-center">IoT<br/>Monitoring</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-80 flex items-center justify-center">
                  <span className="text-white font-bold text-sm text-center">Supply Chain<br/>Transparency</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg opacity-80 flex items-center justify-center">
                  <span className="text-white font-bold text-sm text-center">Patient<br/>Safety</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white text-center">
                Pharmaceutical Innovation
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;