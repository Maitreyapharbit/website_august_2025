'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Company {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

const CompanyManager: React.FC = () => {
  const { token } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await fetch('/api/company');
      const data = await response.json();

      if (data.success) {
        setCompany(data.data);
        setFormData({
          name: data.data.name || '',
          description: data.data.description || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          address: data.data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching company info:', error);
    }
    setIsFetching(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/company', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setCompany(data.data);
        setIsEditing(false);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error updating company info:', error);
      alert('Failed to update company information');
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    if (company) {
      setFormData({
        name: company.name || '',
        description: company.description || '',
        email: company.email || '',
        phone: company.phone || '',
        address: company.address || ''
      });
    }
    setIsEditing(false);
  };

  if (isFetching) {
    return (
      <div className="glass-immersive p-8 rounded-2xl text-center">
        <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
        <p className="text-primary-white">Loading company information...</p>
      </div>
    );
  }

  return (
    <div className="glass-immersive p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-primary-white">Company Information</h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <input
              type="text"
              placeholder=" "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              required
            />
            <label className="form-label">Company Name</label>
          </div>

          <div className="form-group">
            <textarea
              placeholder=" "
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="form-input resize-none"
              rows={4}
              required
            />
            <label className="form-label">Description</label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <input
                type="email"
                placeholder=" "
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                required
              />
              <label className="form-label">Email</label>
            </div>

            <div className="form-group">
              <input
                type="tel"
                placeholder=" "
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
                required
              />
              <label className="form-label">Phone</label>
            </div>
          </div>

          <div className="form-group">
            <textarea
              placeholder=" "
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="form-input resize-none"
              rows={3}
              required
            />
            <label className="form-label">Address</label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-secondary-cyan mb-2">Company Name</h4>
            <p className="text-primary-white">{company?.name}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-secondary-cyan mb-2">Description</h4>
            <p className="text-primary-white leading-relaxed">{company?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-secondary-cyan mb-2">Email</h4>
              <p className="text-primary-white">{company?.email}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-secondary-cyan mb-2">Phone</h4>
              <p className="text-primary-white">{company?.phone}</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-secondary-cyan mb-2">Address</h4>
            <p className="text-primary-white">{company?.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManager;