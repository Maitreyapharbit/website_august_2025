'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      router.replace('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    router.replace('/admin/login');
  };

  const navLinkClass = (href: string) =>
    `flex items-center px-4 py-2 rounded-lg transition-colors ${
      pathname?.startsWith(href)
        ? 'bg-secondary-cyan/20 text-secondary-cyan'
        : 'text-primary-white hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen modern-section">
      {/* Header */}
      <header className="border-b border-secondary-cyan/20 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary-white">Admin Panel</h1>
          <button
            className="md:hidden text-primary-white border border-white/20 px-3 py-1 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Menu
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:col-span-3 lg:col-span-2`}>
          <nav className="glass-immersive p-4 rounded-2xl space-y-2">
            <Link className={navLinkClass('/admin/dashboard')} href="/admin/dashboard">Dashboard</Link>
            <Link className={navLinkClass('/admin/blogs')} href="/admin/blogs">Blog Management</Link>
            <Link className={navLinkClass('/admin/company')} href="/admin/company">Company Information</Link>
            <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 rounded-lg text-primary-white hover:bg-white/5">
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="md:col-span-9 lg:col-span-10">
          {children}
        </main>
      </div>
    </div>
  );
}

