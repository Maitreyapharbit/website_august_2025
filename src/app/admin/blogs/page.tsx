'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogItem {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  image_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export default function BlogListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      router.replace('/admin/login');
      return;
    }
    fetchBlogs();
  }, [router]);

  const filteredBlogs = useMemo(() => {
    if (!search) return blogs;
    const s = search.toLowerCase();
    return blogs.filter(b => (b.title || '').toLowerCase().includes(s));
  }, [blogs, search]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to load blogs');
      const json = await res.json();
      setBlogs(json.data?.blogs ?? []);
    } catch (e: any) {
      setError(e.message || 'Error loading blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return;
    try {
      const token = localStorage.getItem('admin_access_token');
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchBlogs();
      alert('Blog deleted successfully');
    } catch (e: any) {
      alert(e.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-primary-white">Blogs</h2>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title..."
            className="flex-1 sm:w-64 bg-black/30 text-primary-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:border-secondary-cyan"
          />
          <Link href="/admin/blogs/new" className="btn-secondary px-4 py-2 rounded-lg">Add New Blog</Link>
        </div>
      </div>

      <div className="glass-immersive rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5">
              <tr className="text-left text-primary-white">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date Created</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-primary-white">Loading...</td></tr>
              )}
              {error && (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-red-400">{error}</td></tr>
              )}
              {!loading && !error && filteredBlogs.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-primary-white">No blogs found</td></tr>
              )}
              {!loading && !error && filteredBlogs.map((b) => (
                <tr key={b.id} className="border-t border-white/10">
                  <td className="px-4 py-3 text-primary-white">{b.title}</td>
                  <td className="px-4 py-3 text-primary-white opacity-80">{b.created_at ? new Date(b.created_at).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${b.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-300'}`}>
                      {b.status || 'draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link href={`/admin/blogs/edit/${b.id}`} className="inline-block px-3 py-1 rounded bg-white/10 text-primary-white hover:bg-white/20">Edit</Link>
                    <button onClick={() => handleDelete(b.id)} className="inline-block px-3 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

