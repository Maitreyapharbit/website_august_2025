import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-darkBlue border-t border-secondary-teal shadow-2xl">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-lg flex items-center justify-center">
                <span className="text-primary-white font-bold">P</span>
              </div>
              <span className="text-primary-white font-bold text-lg">Pharbit</span>
            </div>
            <p className="text-primary-white text-sm leading-relaxed">
              Transforming Germany's pharmaceutical industry with secure, transparent blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-primary-blue font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link 
                href="#mission" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Our Mission
              </Link>
              <Link 
                href="#timeline" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Road to Launch
              </Link>
              <Link 
                href="#blogs" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Latest Insights
              </Link>
              <Link 
                href="#contact" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-primary-blue font-semibold text-lg">Connect</h3>
            <div className="space-y-2">
              <p className="text-primary-white text-sm">
                <span className="text-secondary-cyan">Email:</span> info@pharbit.com
              </p>
              <div className="flex items-center space-x-4">
                <Link 
                  href="https://twitter.com/Pharbit" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-secondary-teal">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-white text-sm text-center md:text-left">
              © 2025 Pharbit | Launching January–August 2026
            </p>
            <div className="flex items-center space-x-6">
              <Link 
                href="/terms" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Terms of Use
              </Link>
              <Link 
                href="/privacy" 
                className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;