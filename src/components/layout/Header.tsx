'use client';

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass backdrop-filter backdrop-blur-lg' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-white font-bold text-xl">Modern</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, index) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-white hover:text-purple-400 transition-all duration-300 relative group animate-fade-in stagger-${index + 1}`}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Theme Toggle */}
            <div 
              className={`theme-toggle ${isDarkMode ? 'dark' : ''} animate-fade-in stagger-6`}
              onClick={toggleTheme}
            ></div>
          </div>

          {/* Mobile Menu Button */}
          <div 
            className={`hamburger md:hidden ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, index) => (
          <button 
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`mobile-menu-item text-white hover:text-purple-400 transition-colors duration-300`}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default Header;

        <div className="flex items-center justify-between">
          {/* Logo */}
          <ResponsiveLogo 
            href="/" 
            className="flex-shrink-0"
            mobileSize="sm"
            desktopSize="md"
            showTextOnMobile={false}
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