'use client';
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Text Content */}
          <div data-aos="fade-right">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                About 
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Pharbit
                </span>
              </h2>
              <p className="text-xl text-blue-600 font-semibold mb-6">Compliance • Transparency • Innovation</p>
            </div>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Pharbit is a pioneering pharmaceutical technology company that combines blockchain technology with IoT sensors to create an unbreakable chain of custody for medicines from manufacturing to patient delivery.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Founded to address the critical global challenge of counterfeit drugs, we provide pharmaceutical companies worldwide with cutting-edge solutions for supply chain transparency, regulatory compliance, and patient safety.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <h3 className="text-3xl font-bold text-red-600 mb-2">1M+</h3>
                <p className="text-slate-700 font-medium">Deaths from Counterfeits</p>
                <p className="text-slate-500 text-sm">Prevented annually</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-3xl font-bold text-orange-600 mb-2">€200B+</h3>
                <p className="text-slate-700 font-medium">Annual Losses</p>
                <p className="text-slate-500 text-sm">From counterfeits</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div data-aos="fade-left" className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Blockchain Security</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c3.808-3.808 9.98-3.808 13.788 0M12 12h.01" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">IoT Monitoring</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Supply Chain Transparency</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300">
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Patient Safety</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Pharmaceutical Innovation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Revolutionizing global healthcare through cutting-edge blockchain technology and IoT integration.
                </p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-lg">99.9%</div>
                    <div className="text-slate-500 text-xs">Security</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-lg">24/7</div>
                    <div className="text-slate-500 text-xs">Monitoring</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-blue-600 font-bold text-lg">Global</div>
                    <div className="text-slate-500 text-xs">Reach</div>
                  </div>
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