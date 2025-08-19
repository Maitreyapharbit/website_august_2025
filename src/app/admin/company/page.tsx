'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CompanyInfo {
  company_name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export default function CompanyPage() {
  const router = useRouter();
  const [form, setForm] = useState<CompanyInfo>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    loadCompany();
  }, [router]);

  const loadCompany = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/company');
      if (!res.ok) throw new Error('Failed to load company info');
      const json = await res.json();
      const data = json.data || {};
      setForm({
        company_name: data.company_name || data.name || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip_code: data.zip_code || '',
        phone: data.phone || '',
        email: data.email || '',
        website: data.website || '',
      });
    } catch (e: any) {
      setError(e.message || 'Error loading company info');
    } finally {
      setLoading(false);
    }
  };

  const setField = (key: keyof CompanyInfo, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const validate = () => {
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Invalid email format';
    if (form.website && !/^https?:\/\//.test(form.website)) return 'Website URL must start with http:// or https://';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSaving(true);
    setError(null);
    try {
      const token = localStorage.getItem('admin_access_token');
      const res = await fetch('/api/company', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.company_name,
          email: form.email,
          phone: form.phone,
          address: [form.address, form.city, form.state, form.zip_code].filter(Boolean).join(', ').trim(),
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error('Failed to update company info');
      alert('Company information updated');
    } catch (e: any) {
      setError(e.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-primary-white">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-white mb-6">Company Information</h2>
      <form onSubmit={handleSubmit} className="glass-immersive p-6 rounded-2xl space-y-4 max-w-3xl">
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <label className="block text-primary-white mb-1">Company Name</label>
          <input value={form.company_name || ''} onChange={(e) => setField('company_name', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
        </div>
        <div>
          <label className="block text-primary-white mb-1">Street Address</label>
          <input value={form.address || ''} onChange={(e) => setField('address', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-primary-white mb-1">City</label>
            <input value={form.city || ''} onChange={(e) => setField('city', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
          <div>
            <label className="block text-primary-white mb-1">State</label>
            <input value={form.state || ''} onChange={(e) => setField('state', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
          <div>
            <label className="block text-primary-white mb-1">ZIP Code</label>
            <input value={form.zip_code || ''} onChange={(e) => setField('zip_code', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-primary-white mb-1">Phone Number</label>
            <input value={form.phone || ''} onChange={(e) => setField('phone', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
          <div>
            <label className="block text-primary-white mb-1">Email Address</label>
            <input value={form.email || ''} onChange={(e) => setField('email', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
        </div>
        <div>
          <label className="block text-primary-white mb-1">Website URL</label>
          <input value={form.website || ''} onChange={(e) => setField('website', e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
        </div>

        <div className="flex gap-3">
          <button disabled={saving} type="submit" className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-60">{saving ? 'Saving...' : 'Save Changes'}</button>
          <button type="button" onClick={() => loadCompany()} className="px-4 py-2 rounded-lg bg-white/10 text-primary-white hover:bg-white/20">Cancel</button>
        </div>
      </form>
    </div>
  );
}

