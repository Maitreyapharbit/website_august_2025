
'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import CompanyManager from '@/components/admin/CompanyManager';

const About: React.FC = () => {
  const { isAdmin } = useAuth();
  const [showAdminPanel, setShowAdminPanel] = React.useState(false);

  return (
    <section id="about" className="section modern-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Text Content */}
          <div data-aos="fade-right">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-black text-primary-white mb-6">
                About{' '}
                <span className="bg-gradient-to-r from-primary-blue to-secondary-cyan bg-clip-text text-transparent">
                  Pharbit
                </span>
              </h2>
              <p className="text-xl text-secondary-cyan font-semibold mb-6">Compliance • Transparency • Innovation</p>
              
              {/* Admin Controls */}
              {isAdmin && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{showAdminPanel ? 'Hide' : 'Edit'} Company Info</span>
                  </button>
                </div>
              )}
            </div>
            <p className="text-lg text-primary-white opacity-80 mb-8 leading-relaxed">
              Pharbit is a pioneering pharmaceutical technology company that combines blockchain technology with IoT sensors to create an unbreakable chain of custody for medicines from manufacturing to patient delivery.
            </p>
            <p className="text-lg text-primary-white opacity-80 mb-8 leading-relaxed">
              Founded to address the critical global challenge of counterfeit drugs, we provide pharmaceutical companies worldwide with cutting-edge solutions for supply chain transparency, regulatory compliance, and patient safety.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="modern-card p-6">
                <h3 className="text-3xl font-bold text-red-400 mb-2">1M+</h3>
                <p className="text-primary-white font-medium">Deaths from Counterfeits</p>
                <p className="text-primary-white opacity-70 text-sm">Prevented annually</p>
              </div>
              <div className="modern-card p-6">
                <h3 className="text-3xl font-bold text-orange-400 mb-2">€200B+</h3>
                <p className="text-primary-white font-medium">Annual Losses</p>
                <p className="text-primary-white opacity-70 text-sm">From counterfeits</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div data-aos="fade-left" className="relative">
            <div className="modern-card p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="h-32 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300 animate-neon-pulse">
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Blockchain Security</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-secondary-neonGreen to-secondary-teal rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300 animate-neon-pulse" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c3.808-3.808 9.98-3.808 13.788 0M12 12h.01" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">IoT Monitoring</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-secondary-purple to-secondary-pink rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300 animate-neon-pulse" style={{ animationDelay: '1s' }}>
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Supply Chain Transparency</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all duration-300 animate-neon-pulse" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-white font-bold text-center text-sm">Patient Safety</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-white mb-3">
                  Pharmaceutical Innovation
                </h3>
                <p className="text-primary-white opacity-80 text-sm leading-relaxed mb-6">
                  Revolutionizing global healthcare through cutting-edge blockchain technology and IoT integration.
                </p>
                
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">99.9%</div>
                    <div className="text-primary-white opacity-70 text-xs">Security</div>
                  </div>
                  <div className="w-px h-8 bg-secondary-cyan opacity-30"></div>
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">24/7</div>
                    <div className="text-primary-white opacity-70 text-xs">Monitoring</div>
                  </div>
                  <div className="w-px h-8 bg-secondary-cyan opacity-30"></div>
                  <div className="text-center">
                    <div className="text-secondary-cyan font-bold text-lg">Global</div>
                    <div className="text-primary-white opacity-70 text-xs">Reach</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Admin Panel */}
        {isAdmin && showAdminPanel && (
          <div className="mt-16">
            <CompanyManager />
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
