import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#018ee8',
          darkBlue: '#0e345d',
          slate: '#1e293b',
          white: '#ffffff',
          lightBlue: '#4facfe',
          neon: '#00f2fe',
          deepBlue: '#0a1628',
          electricBlue: '#0066ff',
        },
        secondary: {
          cyan: '#01ffff',
          teal: '#005656',
          black: '#000000',
          purple: '#667eea',
          pink: '#764ba2',
          green: '#4ade80',
          darkTeal: '#003333',
          neonGreen: '#39ff14',
          gold: '#ffd700',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-horizontal': 'slideHorizontal 1s ease-out',
        'flip-card': 'flipCard 0.6s ease-in-out',
        'code-typing': 'codeTyping 3s steps(40) infinite',
        'particle-float': 'particleFloat 12s ease-in-out infinite',
        'data-flow': 'dataFlow 3s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'text-glow': 'textGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(1, 142, 232, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(1, 255, 255, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        slideHorizontal: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        flipCard: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        codeTyping: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) translateX(20px) rotate(120deg)' },
          '66%': { transform: 'translateY(10px) translateX(-15px) rotate(240deg)' },
        },
        dataFlow: {
          '0%': { transform: 'translateX(-100%) scale(0)' },
          '50%': { transform: 'translateX(0%) scale(1)' },
          '100%': { transform: 'translateX(100%) scale(0)' },
        },
        neonPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
            textShadow: '0 0 5px currentColor'
          },
          '50%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            textShadow: '0 0 10px currentColor'
          },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        textGlow: {
          '0%': { textShadow: '0 0 10px rgba(1, 255, 255, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(1, 255, 255, 0.8), 0 0 30px rgba(1, 255, 255, 0.6)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(1, 142, 232, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(1, 255, 255, 0.5)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
    },
  },
  plugins: [],
};

export default config;