'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import Card from '@/components/ui/Card';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

// Sample blog data (will be replaced with API call)
const sampleBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Blockchain Revolution in German Pharmaceuticals',
    excerpt: 'Exploring how blockchain technology is set to transform pharmaceutical supply chains across Germany, ensuring transparency and security.',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Smart Contracts: Securing Drug Supply Chains',
    excerpt: 'Learn how smart contracts ensure authenticity and traceability in pharmaceutical distribution, preventing counterfeit drugs.',
    date: '2025-01-10',
    readTime: '7 min read',
    category: 'Innovation',
  },
  {
    id: '3',
    title: 'IoT Integration with Blockchain Technology',
    excerpt: 'Combining IoT sensors with blockchain for real-time monitoring of pharmaceutical products throughout the supply chain.',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'IoT',
  },
  {
    id: '4',
    title: 'The Future of Pharmaceutical Compliance',
    excerpt: 'How blockchain technology is revolutionizing regulatory compliance and audit trails in the pharmaceutical industry.',
    date: '2024-12-28',
    readTime: '8 min read',
    category: 'Compliance',
  },
  {
    id: '5',
    title: 'Small Business Impact: Blockchain Adoption',
    excerpt: 'Understanding how small pharmaceutical businesses can benefit from blockchain technology and digital transformation.',
    date: '2024-12-20',
    readTime: '4 min read',
    category: 'Business',
  },
  {
    id: '6',
    title: 'PHB Token: The Future of Pharma Crypto',
    excerpt: 'Introducing the Pharbit token ecosystem and its role in the future of pharmaceutical blockchain transactions.',
    date: '2024-12-15',
    readTime: '6 min read',
    category: 'Cryptocurrency',
  },
];

const Blogs: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Innovation', 'IoT', 'Compliance', 'Business', 'Cryptocurrency'];

  useEffect(() => {
    // Simulate API call
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // In a real app, this would be: const response = await fetch('/api/blogs');
        // For now, we'll simulate the API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBlogs(sampleBlogs);
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blogs" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary-blue text-primary-white'
                    : 'bg-transparent text-secondary-cyan border border-secondary-teal hover:bg-secondary-teal hover:text-primary-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary-cyan"></div>
              <p className="text-primary-white mt-4">Loading insights<span className="loading-dots"></span></p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-primary-white">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-primary px-6 py-2 rounded-lg mt-4"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <Card
                  key={blog.id}
                  className={`card-hover transition-all duration-500 ${
                    isInView ? 'animate-fade-in' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-secondary-teal text-primary-white text-xs font-semibold rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-secondary-cyan text-sm">{blog.readTime}</span>
                  </div>

                  {/* Blog Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-secondary-cyan hover:text-primary-blue transition-colors duration-300 cursor-pointer">
                      {blog.title}
                    </h3>
                    
                    <p className="text-primary-white text-sm leading-relaxed">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-teal">
                      <span className="text-secondary-cyan text-sm">
                        {formatDate(blog.date)}
                      </span>
                      <button className="text-primary-blue hover:text-secondary-cyan transition-colors duration-300 text-sm font-semibold flex items-center space-x-1">
                        <span>Read More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && filteredBlogs.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-effect p-8 rounded-xl max-w-md mx-auto">
                <svg className="w-12 h-12 text-secondary-cyan mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-primary-white">No insights found for "{selectedCategory}"</p>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="text-secondary-cyan hover:text-primary-blue transition-colors duration-300 mt-2"
                >
                  View all insights
                </button>
              </div>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <div className="glass-effect p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-primary-blue mb-4">
                Stay Updated
              </h3>
              <p className="text-primary-white mb-6">
                Get the latest insights delivered directly to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex-1 px-4 py-3 rounded-lg"
                />
                <button className="btn-primary px-6 py-3 rounded-lg font-semibold whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;