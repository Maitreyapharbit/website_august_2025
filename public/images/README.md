# Logo Files Directory

This directory contains all logo and favicon files for the Pharbit website.

## Required Files

### Main Logo
- `pharbit-logo.png` - Your main logo file (PNG format recommended)
  - Recommended size: 512x512px or larger
  - Transparent background preferred
  - High resolution for crisp display

### Favicon Files
You can generate these from your main logo using online tools like:
- https://realfavicongenerator.net/
- https://favicon.io/

Required favicon files:
- `favicon-16x16.png` - 16x16px favicon
- `favicon-32x32.png` - 32x32px favicon
- `apple-touch-icon.png` - 180x180px for iOS devices
- `android-chrome-192x192.png` - 192x192px for Android
- `android-chrome-512x512.png` - 512x512px for Android

### Social Media Images
- `og-image.png` - 1200x630px for social media sharing

## How to Add Your Logo

1. **Place your logo file** as `pharbit-logo.png` in this directory
2. **Generate favicons** from your logo using one of the online tools above
3. **Place all favicon files** in this directory
4. **Create og-image.png** for social media sharing (1200x630px)

## File Structure
```
public/images/
├── pharbit-logo.png          # Your main logo
├── favicon-16x16.png         # Small favicon
├── favicon-32x32.png         # Standard favicon
├── apple-touch-icon.png      # iOS touch icon
├── android-chrome-192x192.png # Android icon (small)
├── android-chrome-512x512.png # Android icon (large)
├── og-image.png              # Social media image
└── README.md                 # This file
```

## Notes
- All images should be optimized for web (compressed PNG or WebP)
- The logo component will automatically handle responsive sizing
- Favicons are automatically configured in the layout
- Social media images are configured in the metadata