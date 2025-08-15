import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "Pharbit - Transforming Germany's Pharmaceutical Industry with Blockchain",
  description: "Secure, transparent, future-ready blockchain solutions for the pharmaceutical industry. Launching January-August 2026.",
  keywords: "blockchain, pharmaceutical, Germany, smart contracts, IoT, supply chain, transparency",
  authors: [{ name: "Pharbit" }],
  openGraph: {
    title: "Pharbit - Blockchain Pharmaceutical Solutions",
    description: "Transforming Germany's pharmaceutical industry with secure blockchain technology",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pharbit - Blockchain Pharmaceutical Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharbit - Blockchain Pharmaceutical Solutions",
    description: "Transforming Germany's pharmaceutical industry with secure blockchain technology",
    creator: "@Pharbit",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/images/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/images/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}