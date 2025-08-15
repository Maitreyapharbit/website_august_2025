# Pharbit - Blockchain Pharmaceutical Solutions

A modern Next.js website for Pharbit, transforming Germany's pharmaceutical industry with blockchain technology.

## 🚀 **Project Status: READY**

✅ **Complete logo system implemented**  
✅ **Responsive design with Tailwind CSS**  
✅ **TypeScript configuration**  
✅ **PWA support with favicon system**  
✅ **Accessibility features**  

## 📁 **Project Structure**

```
pharbit-nextjs/
├── public/
│   ├── favicon/              # Favicon files (ready for upload)
│   ├── images/
│   │   └── pharbit-logo.svg  # Placeholder logo (ready to replace)
│   └── site.webmanifest      # PWA configuration
├── src/
│   ├── app/                  # Next.js 13+ app directory
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components (Logo, Button, etc.)
│   │   ├── layout/          # Layout components (Header, Footer)
│   │   ├── sections/        # Page sections
│   │   └── animations/      # Animation components
│   └── hooks/               # Custom React hooks
├── scripts/                 # Utility scripts
└── [config files]           # Next.js, TypeScript, Tailwind configs
```

## 🎨 **Design System**

### **Color Palette**
- **Primary Blue**: `#018ee8`
- **Primary Dark Blue**: `#0e345d`
- **Primary White**: `#ffffff`
- **Secondary Cyan**: `#01ffff`
- **Secondary Teal**: `#005656`

### **Typography**
- **Font**: Inter (Google Fonts)
- **Responsive**: Proper scaling across devices

## 🖼️ **Logo System**

### **Features**
- ✅ **Responsive sizing** (sm, md, lg, xl)
- ✅ **Hover animations** with scale and color transitions
- ✅ **Auto-responsive** behavior (mobile/tablet/desktop)
- ✅ **Clickable navigation** to homepage
- ✅ **Accessibility** with proper alt text
- ✅ **Brand color integration**

### **Components**
- `Logo.tsx` - Main logo component with hover effects
- `ResponsiveLogo.tsx` - Auto-adjusts size based on screen
- `Favicon.tsx` - Handles favicon metadata

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### **Adding Your Logo**
1. **Replace placeholder**: Add your logo to `public/images/pharbit-logo.png`
2. **Generate favicons**: Use [Favicon.io](https://favicon.io/) or run `node scripts/generate-favicons.js`
3. **Place favicon files**: Add to `public/favicon/` directory

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 768px (small logo, text hidden)
- **Tablet**: 768px - 1024px (medium logo with text)
- **Desktop**: > 1024px (large logo with text)

### **Features**
- Mobile-first responsive design
- Touch-friendly navigation
- Optimized for all screen sizes

## 🔧 **Technical Stack**

- **Framework**: Next.js 14.2.15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter)
- **Icons**: SVG with custom animations
- **PWA**: Service worker ready

## 📋 **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🧪 **Testing**

### **TypeScript**
```bash
npm run type-check
```

### **Build Test**
```bash
npm run build
```

## 📚 **Documentation**

- `LOGO_IMPLEMENTATION.md` - Complete logo setup guide
- `FAVICON_SETUP.md` - Favicon configuration guide
- `PROJECT_STATUS.md` - Detailed project status report

## 🎯 **Next Steps**

1. **Add your actual logo file** to `public/images/pharbit-logo.png`
2. **Generate favicon files** and place in `public/favicon/`
3. **Test on different devices** and screen sizes
4. **Customize colors** if needed to match your brand
5. **Deploy to your hosting platform**

## 🤝 **Contributing**

This project is configured for the Pharbit brand. For customizations:
1. Update colors in `tailwind.config.ts`
2. Modify logo components in `src/components/ui/`
3. Adjust responsive behavior in `ResponsiveLogo.tsx`

## 📄 **License**

This project is proprietary to Pharbit.

---

**Ready for Launch**: January-August 2026  
**Technology**: Blockchain Pharmaceutical Solutions  
**Location**: Germany