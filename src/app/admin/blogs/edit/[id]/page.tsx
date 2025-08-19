'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    if (id) {
      loadBlog(id);
    }
  }, [router, id]);

  const loadBlog = async (blogId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blogs/${blogId}`);
      if (!res.ok) throw new Error('Failed to load blog');
      const json = await res.json();
      const b = json.data || {};
      setTitle(b.title || '');
      setContent(b.content || '');
      setFeaturedImage(b.image_url || '');
      setStatus((b.status as any) || 'draft');
    } catch (e: any) {
      setError(e.message || 'Error loading blog');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!title.trim()) return 'Title is required';
    if (!content.trim()) return 'Content is required';
    if (featuredImage && !/^https?:\/\//.test(featuredImage)) return 'Featured Image URL must be a valid URL';
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
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          image_url: featuredImage || null,
          status,
        }),
      });
      if (!res.ok) throw new Error('Failed to update blog');
      alert('Blog updated successfully');
      router.push('/admin/blogs');
    } catch (e: any) {
      setError(e.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-primary-white">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-white mb-6">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="glass-immersive p-6 rounded-2xl space-y-4 max-w-3xl">
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <label className="block text-primary-white mb-1">Title<span className="text-red-400">*</span></label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
        </div>
        <div>
          <label className="block text-primary-white mb-1">Content<span className="text-red-400">*</span></label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan"></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-primary-white mb-1">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-primary-white mb-1">Featured Image URL</label>
            <input value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} className="w-full bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan" />
          </div>
        </div>

        <div className="flex gap-3">
          <button disabled={saving} type="submit" className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-60">{saving ? 'Saving...' : 'Update'}</button>
          <button type="button" onClick={() => router.push('/admin/blogs')} className="px-4 py-2 rounded-lg bg-white/10 text-primary-white hover:bg-white/20">Cancel</button>
        </div>
      </form>
    </div>
  );
}

