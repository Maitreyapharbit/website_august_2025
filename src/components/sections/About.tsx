'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid grid-2 items-center gap-16">
          {/* Text Content */}
          <div data-aos="fade-right">
            <h2 className="text-xl gradient-text mb-8">About Our Agency</h2>
            <p className="text-lg text-white opacity-90 mb-6">
              We're a team of passionate designers and developers who believe in the power of 
              great design to transform businesses and create meaningful connections with users.
            </p>
            <p className="text-lg text-white opacity-90 mb-8">
              With over 5 years of experience in the industry, we've helped startups and 
              established companies alike achieve their digital goals through innovative 
              solutions and cutting-edge technology.
            </p>
            
            <div className="grid grid-2 gap-6">
              <div className="glass-dark p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
                <p className="text-purple-400">Projects Completed</p>
              </div>
              <div className="glass-dark p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-2">98%</h3>
                <p className="text-purple-400">Client Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div data-aos="fade-left" className="relative">
            <div className="glass-dark p-8 rounded-xl">
              <div className="grid grid-2 gap-4 mb-6">
                <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-80"></div>
                <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-80"></div>
                <div className="h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg opacity-80"></div>
                <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg opacity-80"></div>
              </div>
              <h3 className="text-xl font-bold text-white text-center">
                Creative Excellence
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;