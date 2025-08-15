#!/usr/bin/env node

/**
 * Favicon Generator Script
 * 
 * This script helps generate favicons from your main logo.
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
  console.log('Sharp not found. Install it with: npm install sharp');
  console.log('Or use online tools like: https://realfavicongenerator.net/');
  process.exit(1);
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const inputPath = path.join(__dirname, '../public/images/pharbit-logo.png');
const outputDir = path.join(__dirname, '../public/images');

async function generateFavicons() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log('❌ Logo file not found at:', inputPath);
      console.log('Please place your logo as "pharbit-logo.png" in the public/images directory');
      return;
    }

    console.log('🔄 Generating favicons...');

    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 14, g: 52, b: 93, alpha: 1 } // primary-darkBlue
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    console.log('\n🎉 All favicons generated successfully!');
    console.log('📁 Check the public/images directory for your favicon files.');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
  }
}

// Run the script
generateFavicons();