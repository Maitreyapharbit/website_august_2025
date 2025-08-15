'use client';

import React from 'react';

const Blogs: React.FC = () => {
  return (
    <section id="blogs" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="section-title text-4xl md:text-5xl font-bold text-primary-blue mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-primary-white max-w-3xl mx-auto">
              Stay updated with the latest developments in blockchain pharmaceutical technology
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-6"></div>
          </div>

          {/* Blog Content */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Coming Soon
              </h3>
              <p className="text-primary-white">
                Our blog will feature insights on blockchain technology, pharmaceutical innovation, 
                and the future of secure supply chains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;