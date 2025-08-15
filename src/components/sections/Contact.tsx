'use client';

import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-gradient-to-b from-primary-darkBlue to-secondary-black">
      <div className="container mx-auto px-4">
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-primary-white max-w-3xl mx-auto">
              Ready to transform your pharmaceutical business with blockchain technology? 
              Let's discuss how Pharbit can help you.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-6"></div>
          </div>

          {/* Contact Content */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <p className="text-primary-white">
                  <span className="text-secondary-cyan">Email:</span> info@pharbit.com
                </p>
                <p className="text-primary-white">
                  <span className="text-secondary-cyan">Location:</span> Germany
                </p>
                <p className="text-primary-white">
                  <span className="text-secondary-cyan">Launch Timeline:</span> January-August 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;