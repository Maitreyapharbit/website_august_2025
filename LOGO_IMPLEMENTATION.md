# Pharbit Logo Implementation Guide

## 📁 File Structure

Place your logo files in the following structure:

```
public/
├── images/
│   ├── pharbit-logo.png          # Main logo (PNG format recommended)
│   ├── pharbit-logo.svg          # Vector version (optional)
│   └── pharbit-logo-white.png    # White version for dark backgrounds
├── favicon.ico                   # 16x16 favicon
├── favicon-16x16.png            # 16x16 PNG favicon
├── favicon-32x32.png            # 32x32 PNG favicon
├── apple-touch-icon.png         # 180x180 for iOS
├── android-chrome-192x192.png   # 192x192 for Android
├── android-chrome-512x512.png   # 512x512 for Android
└── site.webmanifest            # PWA manifest
```

## 🎯 Logo File Requirements

### Main Logo (`pharbit-logo.png`)
- **Format**: PNG with transparency
- **Size**: 512x512px minimum (for crisp display at all sizes)
- **Background**: Transparent
- **Colors**: Your brand colors (works with the existing color scheme)

### Favicon Files
Create these sizes from your main logo:
- `favicon.ico` (16x16, 32x32, 48x48)
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png` (192x192)
- `android-chrome-512x512.png` (512x512)

## 🚀 How to Add Your Logo

1. **Place your logo file** in `public/images/pharbit-logo.png`
2. **Create favicon versions** using online tools like:
   - [Favicon.io](https://favicon.io/)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
3. **Place all favicon files** in the `public/` directory

## 🎨 Components Created

### 1. Logo Component (`src/components/ui/Logo.tsx`)
- Uses Next.js Image component for optimization
- Responsive sizing (sm, md, lg, xl)
- Hover effects with scale and color transitions
- Optional text display
- Clickable navigation to homepage
- Proper accessibility with alt text

### 2. ResponsiveLogo Component (`src/components/ui/ResponsiveLogo.tsx`)
- Automatically adjusts size based on screen size
- Can hide text on mobile devices
- Uses custom media query hook

### 3. Favicon Support (`src/components/ui/Favicon.tsx`)
- Generates proper favicon metadata
- Supports multiple sizes and formats
- PWA manifest integration

## 📱 Responsive Behavior

The logo automatically adapts to different screen sizes:

- **Mobile (< 768px)**: Small logo, text hidden by default
- **Tablet (768px - 1024px)**: Medium logo with text
- **Desktop (> 1024px)**: Large logo with text

## 🎭 Styling Features

### Hover Effects
- Logo scales up (110%)
- Drop shadow appears
- Text color changes to secondary cyan
- Smooth transitions (300ms)

### Color Scheme Integration
- Uses existing Tailwind color classes:
  - `primary-blue`
  - `secondary-cyan`
  - `primary-white`

## 🔧 Customization Options

### Logo Component Props
```typescript
interface LogoProps {
  className?: string;        // Additional CSS classes
  showText?: boolean;        // Show/hide "Pharbit" text
  size?: 'sm' | 'md' | 'lg' | 'xl';  // Logo size
  href?: string;            // Navigation link (default: '/')
}
```

### ResponsiveLogo Component Props
```typescript
interface ResponsiveLogoProps {
  className?: string;
  href?: string;
  mobileSize?: 'sm' | 'md' | 'lg';
  desktopSize?: 'md' | 'lg' | 'xl';
  showTextOnMobile?: boolean;
}
```

## 📋 Usage Examples

### Basic Logo
```tsx
import Logo from '@/components/ui/Logo';

<Logo />
```

### Logo without text
```tsx
<Logo showText={false} />
```

### Large logo
```tsx
<Logo size="xl" />
```

### Responsive logo
```tsx
import ResponsiveLogo from '@/components/ui/ResponsiveLogo';

<ResponsiveLogo 
  mobileSize="sm"
  desktopSize="lg"
  showTextOnMobile={false}
/>
```

## 🎨 CSS Classes Used

The logo uses these Tailwind classes for styling:

```css
/* Container */
.flex.items-center.space-x-2
.group.cursor-pointer
.transition-all.duration-300

/* Image */
.transition-all.duration-300
.scale-110.drop-shadow-lg (on hover)
.scale-100 (default)

/* Text */
.font-bold.text-primary-white
.text-secondary-cyan (on hover)
.text-sm, .text-xl, .text-2xl, .text-3xl (sizes)

/* Hover overlay */
.bg-gradient-to-br.from-primary-blue/20.to-secondary-cyan/20
.opacity-100 (on hover)
.opacity-0 (default)
```

## ♿ Accessibility Features

- **Alt text**: "Pharbit Logo" for screen readers
- **Semantic HTML**: Proper link structure
- **Keyboard navigation**: Full keyboard support
- **Focus indicators**: Visible focus states
- **ARIA labels**: Proper labeling for assistive technologies

## 🔄 Integration Status

✅ **Completed**:
- Logo component created
- Responsive logo component created
- Header integration complete
- Favicon metadata setup
- PWA manifest created
- Media query hook created

⏳ **Pending**:
- Add your actual logo file to `public/images/pharbit-logo.png`
- Generate favicon files from your logo
- Test on different devices and screen sizes

## 🛠️ Next Steps

1. **Add your logo file** to `public/images/pharbit-logo.png`
2. **Generate favicon files** using online tools
3. **Test the implementation** on different screen sizes
4. **Adjust colors** if needed to match your brand
5. **Test accessibility** with screen readers

Your logo is now ready to be implemented! Just add your logo file and the system will handle the rest.