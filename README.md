# Pharbit - Next.js Frontend

A modern Next.js 14 application for Pharbit, showcasing blockchain-based pharmaceutical supply chain solutions with enhanced visual connections and public API.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive Design** with mobile-first approach
- **Modern UI Components** with glass morphism effects
- **Smooth Animations** and transitions
- **Enhanced Chain Visualizations** in interactive infographics
- **Public API** for content delivery
- **SEO Optimized** with proper meta tags

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   └── sections/         # Page sections
└── hooks/                # Custom React hooks
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Styling

The project uses Tailwind CSS with custom design tokens:

- **Primary Colors:** Blue (#018ee8), Dark Blue (#0e345d), White (#ffffff)
- **Secondary Colors:** Cyan (#01ffff), Teal (#005656), Black (#000000)
- **Custom Animations:** Float, pulse-slow, fade-in, slide-up
- **Glass Morphism Effects:** Backdrop blur with transparency

## Components

### Layout Components
- `Layout` - Main layout wrapper
- `Header` - Navigation header with mobile menu
- `Footer` - Site footer with links

### Section Components
- `Hero` - Landing hero section
- `Mission` - Company mission section
- `Timeline` - Development roadmap
- `Blogs` - Latest insights section
- `Contact` - Contact information
- `Branding` - Company branding section

## Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

For Vercel deployment:
```bash
npm run build
```

## License

Private project for Pharbit.