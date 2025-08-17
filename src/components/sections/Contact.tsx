"use client";

import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-xl gradient-text mb-6" data-aos="fade-up">
            Contact Pharbit
          </h2>
          <p className="text-lg text-white opacity-90 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Ready to secure your pharmaceutical supply chain? Contact us to schedule a demo and learn how Pharbit can protect your patients and your business.
          </p>
        </div>

        <div className="grid grid-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-purple-400">info@pharbit.com</p>
                </div>
              </div>
            
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-purple-400">+4917697711873</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-purple-400">An Europakanal 6, 91056 Erlangen, Germany</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Website</h4>
                  <p className="text-purple-400">pharbit.netlify.app</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <form onSubmit={handleSubmit} className="glass-dark p-8 rounded-xl">
              <div className="grid grid-2 gap-6 mb-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <label className="form-label">Your Name</label>
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  <label className="form-label">Email Address</label>
                </div>
              </div>

              <div className="form-group mb-6">
                <input
                  type="text"
                  name="subject"
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                <label className="form-label">Subject</label>
              </div>

              <div className="form-group mb-8">
                <textarea
                  name="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="form-input resize-none"
                  required
                />
                <label className="form-label">Your Message</label>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner w-5 h-5"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Schedule Consultation</span>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                  Thank you for your interest! We'll contact you within 24 hours to schedule your consultation.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;