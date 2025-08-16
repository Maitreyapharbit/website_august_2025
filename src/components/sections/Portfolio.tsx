'use client';

import React, { useState } from 'react';

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Modern e-commerce solution with advanced features'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Secure and intuitive mobile banking experience'
    },
    {
      id: 3,
      title: 'Brand Identity',
      category: 'design',
      image: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Complete brand identity and visual system'
    },
    {
      id: 4,
      title: 'SaaS Dashboard',
      category: 'web',
      image: 'https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Analytics dashboard for SaaS platform'
    },
    {
      id: 5,
      title: 'Fitness App',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Personal fitness tracking application'
    },
    {
      id: 6,
      title: 'Restaurant Website',
      category: 'web',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Elegant restaurant website with online ordering'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'design', label: 'Design' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            Our Portfolio
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="200">
            Explore our latest projects and see how we've helped businesses achieve their digital goals.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="400">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'glass-dark text-white hover:text-purple-400'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-dark rounded-xl overflow-hidden card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4">
                    <button className="btn-primary text-sm">View Project</button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white opacity-70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;