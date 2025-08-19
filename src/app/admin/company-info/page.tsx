'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { Company, CompanyFormData } from '@/src/types/admin.types';
import { apiClient } from '@/src/lib/api';

export default function CompanyInfoPage() {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<CompanyFormData>({
    address: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      if (!user?.companyId) return;

      try {
        const response = await apiClient.getCompany(user.companyId);
        if (response.success && response.data) {
          setCompany(response.data);
          setFormData({
            address: response.data.address || '',
            email: response.data.email || '',
          });
        }
      } catch (err) {
        setError('Failed to fetch company information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompany();
  }, [user?.companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) return;

    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.updateCompany(user.companyId, formData);
      if (response.success) {
        setSuccess('Company information updated successfully');
        if (response.data) {
          setCompany(response.data);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update company information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Company Information</h3>
            <p className="mt-1 text-sm text-gray-600">
              Update your company's contact information and address details.
            </p>
          </div>
        </div>
        
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                {success && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="text-sm text-green-700">{success}</div>
                  </div>
                )}

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company-name"
                      value={company?.name || 'Pharbit'}
                      disabled
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Company name cannot be changed</p>
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="company@example.com"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      rows={4}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter company address..."
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  {company?.phone && (
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={company.phone}
                        disabled
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500"
                      />
                    </div>
                  )}

                  {company?.website && (
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={company.website}
                        disabled
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 text-gray-500"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}