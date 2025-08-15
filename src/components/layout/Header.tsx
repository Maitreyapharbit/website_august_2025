'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/components/ui/Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo 
            size="medium" 
            showText={true} 
            href="/"
            className="flex-shrink-0"
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-primary-white hover:text-secondary-cyan transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('mission')}
              className="text-primary-white hover:text-secondary-cyan transition-colors duration-300"
            >
              Mission
            </button>
            <button 
              onClick={() => scrollToSection('timeline')}
              className="text-primary-white hover:text-secondary-cyan transition-colors duration-300"
            >
              Timeline
            </button>
            <button 
              onClick={() => scrollToSection('blogs')}
              className="text-primary-white hover:text-secondary-cyan transition-colors duration-300"
            >
              Insights
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary px-6 py-2 rounded-lg font-semibold"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-secondary-teal">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-primary-white hover:text-secondary-cyan transition-colors duration-300 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('mission')}
                className="text-primary-white hover:text-secondary-cyan transition-colors duration-300 text-left"
              >
                Mission
              </button>
              <button 
                onClick={() => scrollToSection('timeline')}
                className="text-primary-white hover:text-secondary-cyan transition-colors duration-300 text-left"
              >
                Timeline
              </button>
              <button 
                onClick={() => scrollToSection('blogs')}
                className="text-primary-white hover:text-secondary-cyan transition-colors duration-300 text-left"
              >
                Insights
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-primary px-6 py-2 rounded-lg font-semibold text-left w-fit"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;