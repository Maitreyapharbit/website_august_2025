import React from 'react';
import Head from 'next/head';

interface FaviconProps {
  logoPath?: string;
}

const Favicon: React.FC<FaviconProps> = ({ logoPath = '/images/pharbit-logo.png' }) => {
  return (
    <Head>
      {/* Standard favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      
      {/* Apple Touch Icon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      
      {/* Android Chrome Icons */}
      <link rel="icon" type="image/png" sizes="192x192" href="/images/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/images/android-chrome-512x512.png" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#0e345d" />
      <meta name="theme-color" content="#0e345d" />
    </Head>
  );
};

export default Favicon;