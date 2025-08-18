'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  tags: string[];
}

interface BlogsResponse {
  success: boolean;
  data: BlogPost[];
  total: number;
}

const Blogs: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        const data: BlogsResponse = await response.json();
        
        if (data.success) {
          setBlogs(data.data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
            {loading && (
              <div className="glass-tech p-8 rounded-xl text-center">
                <div className="animate-spin w-8 h-8 border-2 border-secondary-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-primary-white">Loading latest insights...</p>
              </div>
            )}

            {error && (
              <div className="glass-tech p-8 rounded-xl text-center">
                <div className="text-red-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Unable to Load Content</h3>
                <p className="text-primary-white">{error}</p>
              </div>
            )}

            {!loading && !error && blogs.length > 0 && (
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
            )}

            {!loading && !error && blogs.length === 0 && (
              <div className="glass-tech p-8 text-center rounded-xl">
                <h3 className="text-2xl font-bold tech-text mb-4">
                  Coming Soon
                </h3>
                <p className="text-primary-white opacity-80">
                  Our insights section will feature deep-dive articles on blockchain technology, 
                  pharmaceutical innovation, and the future of secure supply chains.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;