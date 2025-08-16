# Logo Update Instructions

## Current Status
✅ Logo component updated to use `/images/pharbit-logo.png`
⏳ **Next Steps Required:**

## 1. Add Your Logo File
Place your new logo image as:
```
public/images/pharbit-logo.png
```

**Requirements:**
- Format: PNG with transparency
- Size: 512x512px minimum (for crisp display at all sizes)
- Background: Transparent
- Colors: Should work with the existing color scheme

## 2. Generate Favicon Files
After adding your logo, generate favicon files using one of these methods:

### Option A: Automated Script
```bash
# Install sharp if not already installed
npm install sharp

# Run the favicon generation script
node scripts/generate-favicons.js
```

### Option B: Online Tools
1. Go to [Favicon.io](https://favicon.io/) or [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your `pharbit-logo.png` file
3. Download the generated favicon files
4. Place all files in the `public/` directory

### Required Favicon Files:
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png` (192x192)
- `android-chrome-512x512.png` (512x512)

## 3. Test the Implementation
After adding your logo file:
1. Refresh your browser
2. Check that the logo displays correctly in the header
3. Test hover effects
4. Verify responsive behavior on different screen sizes

## Logo Features Already Implemented
✅ Responsive sizing (sm, md, lg, xl)
✅ Hover effects with scale and drop shadow
✅ Optional text display
✅ Clickable navigation to homepage
✅ Proper accessibility with alt text
✅ Next.js Image optimization
✅ Mobile-responsive behavior

## File Locations Updated
- `src/components/ui/Logo.tsx` - Updated to use new logo path
- Logo will be loaded from `/images/pharbit-logo.png`

## Need Help?
If you encounter any issues:
1. Ensure your logo file is exactly at `public/images/pharbit-logo.png`
2. Check that the file format is PNG
3. Verify the file isn't corrupted
4. Clear your browser cache if the old logo still appears

The logo system is now ready for your new logo file!