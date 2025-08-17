import React from 'react';
import Logo from '@/components/ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div data-aos="fade-up" className="lg:col-span-2">
              <Logo size="lg" showText={true} className="mb-6" />
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Securing pharmaceutical supply chains with blockchain technology to protect patients and ensure medication authenticity worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">Li</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <span className="text-sm font-bold">Tw</span>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Address</p>
                  <p className="text-white">An Europakanal 6</p>
                  <p className="text-white">91056 Erlangen, Germany</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-white">+4917697711873</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Website</p>
                  <p className="text-white">pharbit.netlify.app</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <div className="space-y-3">
                {['Home', 'About', 'Features', 'Pricing', 'Contact'].map((link) => (
                  <a 
                    key={link}
                    href={`#${link.toLowerCase()}`} 
                    className="block text-gray-400 hover:text-white hover:text-blue-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-gray-800" data-aos="fade-up">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Pharbit. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;