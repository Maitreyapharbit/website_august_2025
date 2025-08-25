'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

const Blogs: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Static blog data for display
  const blogs = [
    {
      id: '1',
      title: 'Welcome to Pharbit Blog',
      excerpt: 'An introduction to Pharbit\'s blockchain-based pharmaceutical supply chain management platform.',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Platform',
      author: 'Pharbit Team',
      tags: ['pharmaceutical', 'supply-chain', 'technology']
    },
    {
      id: '2',
      title: 'The Future of Pharmaceutical Security',
      excerpt: 'How blockchain technology is transforming pharmaceutical security and patient safety.',
      date: '2024-01-10',
      readTime: '8 min read',
      category: 'Security',
      author: 'Dr. Sarah Johnson',
      tags: ['security', 'compliance', 'counterfeit']
    },
    {
      id: '3',
      title: 'IoT Sensors in Cold Chain Management',
      excerpt: 'Real-time temperature monitoring for pharmaceutical cold chain compliance.',
      date: '2024-01-05',
      readTime: '6 min read',
      category: 'Technology',
      author: 'Tech Team',
      tags: ['iot', 'cold-chain', 'monitoring']
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && blogs.length > 0) {
      // Initial animation for blog cards
      window.gsap.fromTo('.blog-card',
        { y: 50, opacity: 0, rotationY: -15 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blogs-grid',
            start: 'top 80%'
          }
        }
      );
    }
  }, [blogs]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId);
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.to(`#blog-card-${cardId}`, {
        rotationY: 5,
        z: 50,
        duration: 0.3,
        ease: 'power2.out'
      });
      window.gsap.to(`#blog-card-${cardId} .blog-content`, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleCardLeave = () => {
    if (hoveredCard && typeof window !== 'undefined' && window.gsap) {
      window.gsap.to(`#blog-card-${hoveredCard}`, {
        rotationY: 0,
        z: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      window.gsap.to(`#blog-card-${hoveredCard} .blog-content`, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    setHoveredCard(null);
  };

  return (
    <section id="insights" className="section bg-gradient-to-br from-secondary-teal via-primary-darkBlue to-secondary-teal">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tech-text mb-6">
              Latest Insights
            </h2>
            <p className="text-xl text-primary-white opacity-90 max-w-3xl mx-auto">
              Stay updated with the latest developments in blockchain pharmaceutical technology, 
              industry trends, and innovative solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-6 animate-glow"></div>
            
          </div>

          {/* Blog Content */}
          <div className="max-w-6xl mx-auto">
            <div className="blogs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <div
                  key={blog.id}
                  id={`blog-card-${blog.id}`}
                  className="blog-card glass-tech p-6 rounded-xl card-hover cursor-pointer transform-gpu perspective-1000"
                  onMouseEnter={() => handleCardHover(blog.id)}
                  onMouseLeave={handleCardLeave}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="blog-content">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary-blue to-secondary-cyan text-primary-white text-xs font-semibold rounded-full neon-border">
                        {blog.category}
                      </span>
                      <span className="text-secondary-cyan text-sm">{blog.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-primary-white mb-3 line-clamp-2 hover:text-secondary-cyan transition-colors duration-300">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-primary-white opacity-80 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-black bg-opacity-50 border border-secondary-cyan text-secondary-cyan text-xs rounded hover:bg-secondary-cyan hover:text-primary-darkBlue transition-all duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-teal border-opacity-30">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center">
                          <span className="text-primary-white font-bold text-sm">
                            {blog.author.charAt(0)}
                          </span>
                        </div>
                        <span className="text-secondary-cyan text-sm">{blog.author}</span>
                      </div>
                      <span className="text-primary-white opacity-60 text-sm">
                        {formatDate(blog.date)}
                      </span>
                    </div>

                    {/* Read More Button */}
                    <button className="w-full mt-4 glass-enhanced py-3 rounded-lg font-semibold text-sm text-secondary-cyan border border-secondary-cyan hover:bg-secondary-cyan hover:text-primary-darkBlue transition-all duration-300">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;