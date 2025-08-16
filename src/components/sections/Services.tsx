'use client';

import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that engage users and drive conversions.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design']
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Modern, responsive websites built with the latest technologies.',
      features: ['React/Next.js', 'Node.js', 'Database Design', 'API Integration']
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'App Store Optimization', 'Push Notifications']
    },
    {
      icon: '🚀',
      title: 'Digital Strategy',
      description: 'Comprehensive digital strategies to grow your online presence.',
      features: ['SEO Optimization', 'Analytics', 'Performance Monitoring', 'Growth Hacking']
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            Our Services
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            We offer a comprehensive range of digital services to help your business thrive in the modern world.
          </p>
        </div>

        <div className="grid grid-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-dark p-8 rounded-xl card-hover"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white opacity-90 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-purple-400">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;