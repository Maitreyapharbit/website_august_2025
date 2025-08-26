'use client';

import { useEffect, useState } from 'react';
import React from 'react';
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

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Blog', href: '#insights' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo size="md" showText={true} href="#home" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white opacity-80 hover:opacity-100 hover:text-purple-400 transition-all duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/admin"
                className="text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Admin Login
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Demo
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
              <nav className="py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-white opacity-80 hover:opacity-100 hover:text-purple-400 transition-all duration-300 font-medium px-4 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="px-4 pt-4">
                  <a
                    href="/admin"
                    className="block w-full text-center border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:border-white/40 transition-all duration-300 mb-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Login
                  </a>
                  <a
                    href="#contact"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Request Demo
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;