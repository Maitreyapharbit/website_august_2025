import { Metadata } from 'next';

export const generateFaviconMetadata = (): Metadata => {
  return {
    icons: {
      icon: [
        {
          url: '/favicon/favicon.ico',
          sizes: 'any',
        },
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  };
};

export default generateFaviconMetadata;