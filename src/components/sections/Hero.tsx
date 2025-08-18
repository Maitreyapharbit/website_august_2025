'use client';

import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // GSAP Hero Animations with Medicine Bottle Journey
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline();
      
      // Initial hero text animations
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      // Medicine bottle journey animation
      const bottleJourney = window.gsap.timeline({ repeat: -1, delay: 2 });
      
      bottleJourney
        .set('.medicine-bottle', { opacity: 1 })
        .to('.medicine-bottle', {
          motionPath: {
            path: pathRef.current,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
          },
          duration: 12,
          ease: 'none'
        })
        .to('.blockchain-node', {
          scale: 1.4,
          duration: 0.4,
          stagger: 2,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        }, 0)
        .to('.supply-chain-step', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 2.5,
          ease: 'back.out(1.7)'
        }, 1)
        .to('.data-particle', {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out'
        }, 2);

      // Parallax effect
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      window.gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Floating elements animation
    }
  }, []);

  return (
    <section id="home" className="hero-section h-screen flex items-center justify-center relative overflow-hidden modern-section">
      {/* Enhanced Animated Background */}
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-blue via-secondary-cyan to-primary-neon rounded-full blur-3xl animate-morph"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-secondary-purple to-secondary-pink rounded-full blur-3xl animate-morph" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-secondary-neonGreen to-secondary-teal rounded-full blur-3xl animate-morph" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Medicine Bottle Supply Chain Journey */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#01ffff" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#018ee8" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#39ff14" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#018ee8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#01ffff" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Enhanced Supply Chain Path */}
          <path
            ref={pathRef}
            className="supply-chain-path"
            d="M100,400 Q200,250 350,350 Q500,450 650,300 Q800,150 950,250 Q1050,350 1100,400"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="15,8"
            filter="url(#glow)"
          />
          
          {/* Enhanced Blockchain Nodes */}
          <g className="blockchain-nodes">
            <circle cx="150" cy="325" r="25" className="blockchain-node" fill="url(#pathGradient)" filter="url(#glow)" />
            <circle cx="350" cy="350" r="25" className="blockchain-node" fill="url(#pathGradient)" filter="url(#glow)" />
            <circle cx="550" cy="375" r="25" className="blockchain-node" fill="url(#pathGradient)" filter="url(#glow)" />
            <circle cx="750" cy="225" r="25" className="blockchain-node" fill="url(#pathGradient)" filter="url(#glow)" />
            <circle cx="950" cy="250" r="25" className="blockchain-node" fill="url(#pathGradient)" filter="url(#glow)" />
          </g>

          {/* Data Flow Particles */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              className="data-particle"
              cx={150 + i * 100}
              cy={300 + Math.sin(i) * 50}
              r="3"
              fill="#39ff14"
              opacity="0"
              filter="url(#glow)"
            />
          ))}
        </svg>

        {/* Enhanced Medicine Bottle */}
        <div 
          ref={bottleRef}
          className="medicine-bottle absolute opacity-0 transform-gpu"
          style={{ left: '100px', top: '400px' }}
        >
          <div className="w-16 h-20 bg-gradient-to-b from-secondary-neonGreen via-primary-blue to-secondary-cyan rounded-lg relative shadow-2xl">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-primary-deepBlue rounded-t border-2 border-secondary-cyan"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-white rounded opacity-90 animate-pulse"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">💊</div>
          </div>
        </div>

        {/* Enhanced Supply Chain Steps */}
        <div className="supply-chain-step absolute top-72 left-32 opacity-0 transform translate-y-8 scale-75">
          <div className="glass-immersive p-4 rounded-xl text-center neon-border-enhanced">
            <div className="text-2xl mb-2">🏭</div>
            <div className="text-sm text-secondary-cyan font-bold">Manufacturing</div>
            <div className="text-xs text-primary-white opacity-80">Blockchain Verified</div>
          </div>
        </div>
        <div className="supply-chain-step absolute top-80 left-80 opacity-0 transform translate-y-8 scale-75">
          <div className="glass-immersive p-4 rounded-xl text-center neon-border-enhanced">
            <div className="text-2xl mb-2">🚚</div>
            <div className="text-sm text-secondary-cyan font-bold">Distribution</div>
            <div className="text-xs text-primary-white opacity-80">IoT Monitored</div>
          </div>
        </div>
        <div className="supply-chain-step absolute top-56 right-80 opacity-0 transform translate-y-8 scale-75">
          <div className="glass-immersive p-4 rounded-xl text-center neon-border-enhanced">
            <div className="text-2xl mb-2">🏥</div>
            <div className="text-sm text-secondary-cyan font-bold">Pharmacy</div>
            <div className="text-xs text-primary-white opacity-80">Smart Contracts</div>
          </div>
        </div>
        <div className="supply-chain-step absolute top-64 right-32 opacity-0 transform translate-y-8 scale-75">
          <div className="glass-immersive p-4 rounded-xl text-center neon-border-enhanced">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm text-secondary-cyan font-bold">Patient</div>
            <div className="text-xs text-primary-white opacity-80">Verified Safe</div>
          </div>
        </div>
      </div>

      <div className="container text-center relative z-10" ref={heroRef}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-hero section-title mb-8 font-display font-black tracking-tight">
            Securing Pharmaceutical Supply Chains with 
            <span className="block text-glow-effect">Blockchain Technology</span>
          </h1>
          
          <p className="hero-subtitle text-2xl text-shimmer mb-6 font-semibold tracking-wide">
            Compliance • Transparency • Innovation
          </p>
          
          <div className="mb-8">
            <span className="text-lg text-secondary-cyan font-bold tracking-wider animate-neon-pulse px-6 py-2 glass-subtle rounded-full border border-secondary-cyan">
              "Traceable Pharma Trust"
            </span>
          </div>
          
          <p className="hero-description text-lg text-primary-white opacity-90 mb-12 max-w-5xl mx-auto leading-relaxed font-medium">
            Pharbit combines cutting-edge blockchain technology with advanced IoT sensors to create an unbreakable chain of custody for medicines 
            from manufacturing to patient delivery worldwide. We address the critical global challenge of counterfeit drugs 
            while ensuring complete pharmaceutical supply chain transparency and patient safety through innovative smart contracts and real-time monitoring.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="btn-primary text-lg px-10 py-5 font-bold tracking-wide transform-gpu magnetic">
              🚀 Request Live Demo
            </button>
            <button className="btn-secondary text-lg px-10 py-5 font-bold tracking-wide transform-gpu magnetic">
              📄 Download Whitepaper
            </button>
          </div>
          
          {/* Enhanced Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-immersive p-6 rounded-xl card-hover">
              <div className="text-4xl font-black text-secondary-neonGreen mb-2 animate-neon-pulse">99.9%</div>
              <div className="text-primary-white font-semibold">Counterfeit Reduction</div>
            </div>
            <div className="glass-immersive p-6 rounded-xl card-hover">
              <div className="text-4xl font-black text-secondary-cyan mb-2 animate-neon-pulse">€200B+</div>
              <div className="text-primary-white font-semibold">Annual Losses Prevented</div>
            </div>
            <div className="glass-immersive p-6 rounded-xl card-hover">
              <div className="text-4xl font-black text-primary-neon mb-2 animate-neon-pulse">24/7</div>
              <div className="text-primary-white font-semibold">Real-time Monitoring</div>
            </div>
          </div>
          
          {/* Enhanced Scroll Indicator */}
          <div className="hero-scroll absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center text-primary-white opacity-80">
              <span className="text-sm mb-3 font-medium text-shadow-glow">Explore Our Innovation</span>
              <div className="w-8 h-12 border-2 border-secondary-cyan rounded-full flex justify-center neon-border-enhanced backdrop-blur-sm">
                <div className="w-2 h-4 bg-secondary-cyan rounded-full mt-2 animate-bounce shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;