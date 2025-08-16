'use client';

import React, { useState, useEffect } from 'react';

const Testimonials: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Working with this team was an absolute pleasure. They delivered beyond our expectations and helped us achieve a 300% increase in user engagement.',
      avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      role: 'Founder, InnovateCorp',
      content: 'The attention to detail and creative solutions provided by this agency transformed our digital presence completely. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director, GrowthCo',
      content: 'Professional, creative, and results-driven. They understood our vision and brought it to life in ways we never imagined possible.',
      avatar: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="section bg-gradient-to-r from-blue-900/20 to-purple-900/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Don't just take our word for it. Here's what our satisfied clients have to say about our work.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="testimonial-carousel relative">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`testimonial-slide ${index === activeSlide ? 'active' : ''} ${
                  index === activeSlide - 1 || (activeSlide === 0 && index === testimonials.length - 1) ? 'prev' : ''
                }`}
              >
                <div className="glass-dark p-8 rounded-xl text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <blockquote className="text-xl text-white mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                    <p className="text-purple-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="nav-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`nav-dot ${index === activeSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;