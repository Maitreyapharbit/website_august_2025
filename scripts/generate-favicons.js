#!/usr/bin/env node

/**
 * Favicon Generator Script
 * 
 * This script helps generate favicon files from your main logo.
 * You'll need to install sharp: npm install sharp
 * 
 * Usage: node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('⚠️  Sharp not found. Install it with: npm install sharp');
  console.log('📝 Manual favicon generation instructions:');
  console.log('1. Go to https://favicon.io/ or https://realfavicongenerator.net/');
  console.log('2. Upload your logo file');
  console.log('3. Download the generated favicon files');
  console.log('4. Place them in the public/ directory');
  process.exit(0);
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  const logoPath = path.join(__dirname, '../public/images/pharbit-logo.png');
  const faviconDir = path.join(__dirname, '../public/favicon');

  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.log('❌ Logo file not found at:', logoPath);
    console.log('📝 Please add your logo file to public/images/pharbit-logo.png');
    return;
  }

  console.log('🔄 Generating favicon files...');

  try {
    for (const { name, size } of sizes) {
      const outputPath = path.join(faviconDir, name);
      
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    console.log('🎉 All favicon files generated successfully!');
    console.log('📁 Files saved to public/favicon/ directory');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
  }
}

generateFavicons();