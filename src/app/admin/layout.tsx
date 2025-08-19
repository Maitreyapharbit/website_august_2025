import type { Metadata } from "next";
import AdminLayoutClient from './_components/AdminLayoutClient';

export const metadata: Metadata = {
  title: "Pharbit Admin - Dashboard",
  description: "Pharbit administration panel for managing pharmaceutical supply chain operations",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}