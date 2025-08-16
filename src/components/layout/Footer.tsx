import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="section-sm bg-gradient-to-r from-gray-900 to-black">
      <div className="container">
        <div className="grid grid-3 gap-12 mb-12">
          {/* Brand */}
          <div data-aos="fade-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-white font-bold text-xl">Modern</span>
            </div>
            <p className="text-white opacity-70 mb-6">
              Creating exceptional digital experiences that drive results and inspire users.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github', 'dribbble'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 glass-dark rounded-lg flex items-center justify-center text-white hover:text-purple-400 transition-colors duration-300"
                >
                  <span className="text-sm font-bold">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-white font-bold text-lg mb-6">Services</h3>
            <div className="space-y-3">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Strategy'].map((service) => (
                <a 
                  key={service}
                  href="#" 
                  className="block text-white opacity-70 hover:opacity-100 hover:text-purple-400 transition-all duration-300"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-white font-bold text-lg mb-6">Contact</h3>
            <div className="space-y-3">
              <p className="text-white opacity-70">hello@modernportfolio.com</p>
              <p className="text-white opacity-70">+1 (555) 123-4567</p>
              <p className="text-white opacity-70">San Francisco, CA</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10" data-aos="fade-up">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white opacity-70 text-sm mb-4 md:mb-0">
              © 2025 Modern Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service'].map((link) => (
                <a 
                  key={link}
                  href="#" 
                  className="text-white opacity-70 hover:opacity-100 hover:text-purple-400 transition-all duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;