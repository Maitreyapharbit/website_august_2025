'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store tokens
        localStorage.setItem('admin_access_token', data.data.tokens.access);
        localStorage.setItem('admin_refresh_token', data.data.tokens.refresh);
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen modern-section flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-blue rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-cyan rounded-full blur-3xl opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-neonGreen rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Logo size="lg" showText={true} />
          </div>
          <h1 className="text-3xl font-bold text-primary-white mb-2">
            Admin Login
          </h1>
          <p className="text-primary-white opacity-80">
            Access the Pharbit administration panel
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-immersive p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isLoading}
              />
              <label className="form-label">Email Address</label>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isLoading}
              />
              <label className="form-label">Password</label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 glass-subtle rounded-xl">
            <h3 className="text-sm font-semibold text-secondary-cyan mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Demo Credentials
            </h3>
            <div className="space-y-2 text-sm text-primary-white opacity-80">
              <div className="flex justify-between">
                <span>Email:</span>
                <code className="text-secondary-cyan">admin@pharbit.com</code>
              </div>
              <div className="flex justify-between">
                <span>Password:</span>
                <code className="text-secondary-cyan">F#034180427932al</code>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'admin@pharbit.com',
                  password: 'F#034180427932al'
                });
              }}
              className="mt-3 w-full text-xs text-secondary-cyan hover:text-primary-white transition-colors duration-300 border border-secondary-cyan/30 hover:border-secondary-cyan/60 rounded-lg py-2"
            >
              Fill Demo Credentials
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              className="text-sm text-secondary-cyan hover:text-primary-white transition-colors duration-300"
              onClick={() => router.push('/')}
            >
              ← Back to Homepage
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-primary-white opacity-60">
            This is a secure admin area. All login attempts are monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;