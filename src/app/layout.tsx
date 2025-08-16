import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { generateFaviconMetadata } from "@/components/ui/Favicon";
import NetworkAnimation from "@/components/animations/NetworkAnimation";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pharbit - Transforming Germany's Pharmaceutical Industry with Blockchain",
  description: "Secure, transparent, future-ready blockchain solutions for the pharmaceutical industry. Launching January-August 2026.",
  keywords: "blockchain, pharmaceutical, Germany, smart contracts, IoT, supply chain, transparency",
  authors: [{ name: "Pharbit" }],
  openGraph: {
    title: "Pharbit - Blockchain Pharmaceutical Solutions",
    description: "Transforming Germany's pharmaceutical industry with secure blockchain technology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharbit - Blockchain Pharmaceutical Solutions",
    description: "Transforming Germany's pharmaceutical industry with secure blockchain technology",
    creator: "@Pharbit",
  },
  robots: {
    index: true,
    follow: true,
  },
  ...generateFaviconMetadata(),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          {/* Global Network Background */}
          <NetworkAnimation variant="subtle" className="fixed inset-0 w-full h-full z-[-2]" />
          
          {/* Professional Overlay */}
          <div className="fixed inset-0 w-full h-full z-[-1] bg-gradient-to-br from-primary-darkBlue/40 via-primary-blue/30 to-secondary-teal/50"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <Header />
            {children}
          </div>
          
          {/* Custom Cursor */}
          <CustomCursor />
        </div>
      </body>
    </html>
  );
}