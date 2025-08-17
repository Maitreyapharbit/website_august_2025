import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pharbit - Blockchain Pharmaceutical Supply Chain Security",
  description: "Securing pharmaceutical supply chains with blockchain technology. Compliance, transparency, and innovation for patient safety worldwide.",
  keywords: "blockchain, pharmaceutical, supply chain, IoT monitoring, patient safety, counterfeit drugs, compliance",
  authors: [{ name: "Pharbit" }],
  openGraph: {
    title: "Pharbit - Blockchain Pharmaceutical Supply Chain Security",
    description: "Securing pharmaceutical supply chains with blockchain technology for patient safety worldwide",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharbit - Blockchain Pharmaceutical Supply Chain Security",
    description: "Securing pharmaceutical supply chains with blockchain technology for patient safety worldwide",
    creator: "@Pharbit",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <div className="scroll-progress"></div>
        <div className="custom-cursor"></div>
        
        <div className="floating-shape" style={{
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '50%'
        }}></div>
        
        {children}
        
        <script dangerouslySetInnerHTML={{
          __html: `
            // Initialize AOS
            AOS.init({
              duration: 800,
              easing: 'ease-out',
              once: true,
              offset: 100
            });
            
            // Custom cursor
            const cursor = document.querySelector('.custom-cursor');
            let mouseX = 0, mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
            });
            
            function animateCursor() {
              cursor.style.left = mouseX + 'px';
              cursor.style.top = mouseY + 'px';
              requestAnimationFrame(animateCursor);
            }
            animateCursor();
            
            // Hover effects
            document.querySelectorAll('a, button, .card-hover').forEach(el => {
              el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
              el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
            
            // Scroll progress
            window.addEventListener('scroll', () => {
              const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
              document.querySelector('.scroll-progress').style.width = scrolled + '%';
            });
          `
        }} />
      </body>
    </html>
  );
}