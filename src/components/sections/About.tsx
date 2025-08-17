'use client';

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="grid grid-2 items-center gap-16">
          {/* Text Content */}
          <div data-aos="fade-right">
            <div className="text-center mb-8">
              <h2 className="text-xl gradient-text mb-4">About Pharbit</h2>
              <p className="text-lg text-cyan-400 font-semibold">Compliance, Transparency, Innovation</p>
            </div>
            <p className="text-lg text-white opacity-90 mb-8 leading-relaxed">
              Pharbit is a pioneering pharmaceutical technology company that combines blockchain technology 
              with IoT sensors to create an unbreakable chain of custody for medicines from manufacturing 
              to patient delivery. Founded to address the critical global challenge of counterfeit drugs, 
              we provide pharmaceutical companies worldwide with cutting-edge solutions for supply chain 
              transparency, regulatory compliance, and patient safety.
            </p>
            
            <div className="grid grid-2 gap-6">
              <div className="glass-dark p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-2">1M+</h3>
                <p className="text-purple-400">Deaths Prevented Annually</p>
              </div>
              <div className="glass-dark p-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-2">€200B+</h3>
                <p className="text-purple-400">Losses from Counterfeits</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div data-aos="fade-left" className="relative">
            <div className="glass-dark p-8 rounded-xl card-hover">
              <div className="grid grid-2 gap-6 mb-8">
                <div className="h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🔗</div>
                  <span className="text-white font-bold text-center leading-tight">Blockchain<br/>Security</span>
                  <div className="w-8 h-1 bg-white/50 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <div className="h-40 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">📡</div>
                  <span className="text-white font-bold text-center leading-tight">IoT<br/>Monitoring</span>
                  <div className="w-8 h-1 bg-white/50 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <div className="h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🔍</div>
                  <span className="text-white font-bold text-center leading-tight">Supply Chain<br/>Transparency</span>
                  <div className="w-8 h-1 bg-white/50 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </div>
                <div className="h-40 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                  <span className="text-white font-bold text-center leading-tight">Patient<br/>Safety</span>
                  <div className="w-8 h-1 bg-white/50 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Pharmaceutical Innovation
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Revolutionizing global healthcare through cutting-edge blockchain technology, 
                  IoT integration, and comprehensive supply chain solutions.
                </p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">99.9%</div>
                    <div className="text-white/70 text-xs">Security</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">24/7</div>
                    <div className="text-white/70 text-xs">Monitoring</div>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">Global</div>
                    <div className="text-white/70 text-xs">Reach</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating accent elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-secondary-cyan to-primary-blue rounded-full opacity-60 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-40 animate-pulse"></div>
          </div>
        </div>
        
        {/* Additional Info Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="600">
          <div className="glass-dark p-6 rounded-xl card-hover text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">✅</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Verified Authenticity</h4>
            <p className="text-white/80 text-sm">Every pharmaceutical product verified through immutable blockchain records</p>
          </div>
          
          <div className="glass-dark p-6 rounded-xl card-hover text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">🌡️</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Cold Chain Integrity</h4>
            <p className="text-white/80 text-sm">Real-time temperature monitoring ensures medication efficacy</p>
          </div>
          
          <div className="glass-dark p-6 rounded-xl card-hover text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl">📊</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Regulatory Compliance</h4>
            <p className="text-white/80 text-sm">Automated compliance with global pharmaceutical regulations</p>
          </div>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default About;