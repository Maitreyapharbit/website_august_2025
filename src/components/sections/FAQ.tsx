'use client';

import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, digital strategy, and ongoing maintenance and support.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you work with startups or only established companies?',
      answer: 'We work with businesses of all sizes, from early-stage startups to established enterprises. We tailor our approach and pricing to match your specific needs and budget.'
    },
    {
      question: 'What is your development process?',
      answer: 'Our process includes discovery and planning, design and prototyping, development and testing, launch and deployment, and ongoing support and maintenance. We keep you involved throughout every step.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally. This includes updates, security monitoring, and feature enhancements.'
    },
    {
      question: 'How do you handle project communication?',
      answer: 'We believe in transparent communication. We provide regular updates through your preferred channels, whether that\'s email, Slack, or project management tools. You\'ll always know the status of your project.'
    }
  ];

  const toggleItem = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Got questions? We've got answers. Here are some of the most common questions we receive from our clients.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`accordion-item ${activeItem === index ? 'active' : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div 
                className="accordion-header"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <svg 
                  className="accordion-icon w-6 h-6 text-purple-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              <div className="accordion-content">
                <p className="text-white opacity-90 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;