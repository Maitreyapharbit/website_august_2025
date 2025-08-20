'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InfographicNode {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  icon: string;
  color: string;
  connections: string[];
}

const InteractiveInfographic: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  const nodes: InfographicNode[] = [
    {
      id: 'blockchain',
      title: 'Blockchain Network',
      description: 'Immutable ledger storing all pharmaceutical transactions and verifications',
      x: 200,
      y: 200,
      icon: '🔗',
      color: '#018ee8',
      connections: ['smart-contracts', 'iot-sensors']
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      description: 'Automated compliance and verification protocols executed on blockchain',
      x: 500,
      y: 150,
      icon: '📋',
      color: '#01ffff',
      connections: ['blockchain', 'iot-sensors', 'verification']
    },
    {
      id: 'iot-sensors',
      title: 'IoT Sensors',
      description: 'Real-time monitoring of temperature, humidity, and location data',
      x: 350,
      y: 350,
      icon: '📡',
      color: '#39ff14',
      connections: ['blockchain', 'smart-contracts', 'data-flow']
    },
    {
      id: 'verification',
      title: 'Product Verification',
      description: 'Instant authenticity verification using blockchain records',
      x: 650,
      y: 250,
      icon: '✅',
      color: '#667eea',
      connections: ['smart-contracts', 'patient-safety']
    },
    {
      id: 'data-flow',
      title: 'Real-time Data Flow',
      description: 'Continuous data streaming from sensors to blockchain network',
      x: 150,
      y: 400,
      icon: '📊',
      color: '#764ba2',
      connections: ['iot-sensors', 'blockchain']
    },
    {
      id: 'patient-safety',
      title: 'Patient Safety',
      description: 'Guaranteed authentic medications reaching patients safely',
      x: 550,
      y: 400,
      icon: '🛡️',
      color: '#ffd700',
      connections: ['verification']
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ repeat: -1, repeatDelay: 3 });
      
      // Initial setup
      window.gsap.set('.infographic-node', { scale: 0, opacity: 0 });
      window.gsap.set('.connection-line', { strokeDasharray: '8,8', strokeDashoffset: 16 });
      
      // Animate nodes appearing
      tl.to('.infographic-node', {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.3,
        ease: 'back.out(1.7)'
      })
      // Animate connections
      .to('.connection-line', {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.inOut'
      }, '-=0.8')
      // Data flow animation
      .to('.data-pulse', {
        opacity: 1,
        scale: 2,
        duration: 0.4,
        stagger: 0.3,
        yoyo: true,
        repeat: 5,
        ease: 'power2.inOut'
      }, '+=0.5')
      // Node pulsing effect
      .to('.infographic-node', {
        scale: 1.2,
        duration: 0.3,
        stagger: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      }, '+=1');

      // Scroll-triggered animation
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      window.gsap.timeline({
        scrollTrigger: {
          trigger: '.infographic-container',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          onUpdate: (self: any) => {
            setAnimationPhase(Math.floor(self.progress * 4));
          }
        }
      });
    }
  }, []);

  const handleNodeHover = (nodeId: string) => {
    setActiveNode(nodeId);
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.to(`#node-${nodeId}`, {
        scale: 1.3,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Highlight connected nodes
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        node.connections.forEach(connId => {
          window.gsap.to(`#node-${connId}`, {
            scale: 1.15,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    }
  };

  const handleNodeLeave = () => {
    setActiveNode(null);
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.to('.infographic-node', {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const getConnectionPath = (from: InfographicNode, to: InfographicNode) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 40;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <section className="section modern-section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
            How Our Technology Works
          </h2>
          <p className="text-xl text-primary-white opacity-90 max-w-4xl mx-auto leading-relaxed">
            Explore the interconnected ecosystem of blockchain, IoT, and smart contracts 
            that powers pharmaceutical supply chain security through advanced automation and real-time verification
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-8 animate-glow"></div>
        </div>

        <div className="infographic-container glass-immersive rounded-3xl p-12 max-w-7xl mx-auto">
          <svg
            ref={svgRef}
            className="w-full h-96 md:h-[600px]"
            viewBox="0 0 800 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#01ffff" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#018ee8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#39ff14" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#018ee8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#01ffff" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="chainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#01ffff" stopOpacity="1" />
                <stop offset="20%" stopColor="#018ee8" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#39ff14" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#018ee8" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#667eea" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#01ffff" stopOpacity="1" />
              </linearGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#01ffff" stopOpacity="0.8"/>
              </radialGradient>
            </defs>

            {/* Connection Lines */}
            {nodes.map(node => 
              node.connections.map(connId => {
                const connectedNode = nodes.find(n => n.id === connId);
                if (!connectedNode) return null;
                
                return (
                  <path
                    key={`${node.id}-${connId}`}
                    className="connection-line chain-style"
                    d={getConnectionPath(node, connectedNode)}
                    stroke="url(#chainGradient)"
                    strokeWidth="4"
                    fill="none"
                    opacity={activeNode && (activeNode === node.id || activeNode === connId) ? 1 : 0.6}
                    filter="url(#nodeGlow)"
                    strokeDasharray="15,10,5,10"
                    strokeLinecap="round"
                  />
                );
              })
            )}

            {/* Data Pulse Points */}
            {nodes.map(node => (
              <circle
                key={`pulse-${node.id}`}
                className="data-pulse"
                cx={node.x}
                cy={node.y}
                r="6"
                fill="url(#chainGradient)"
                opacity="0"
                filter="url(#nodeGlow)"
              />
            ))}

            {/* Interactive Nodes */}
            {nodes.map(node => (
              <g
                key={node.id}
                id={`node-${node.id}`}
                className="infographic-node interactive-node"
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={handleNodeLeave}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="40"
                  fill={node.color}
                  opacity="0.15"
                  filter="url(#nodeGlow)"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="32"
                  fill="url(#nodeGradient)"
                  stroke={node.color}
                  strokeWidth="3"
                  opacity="0.9"
                />
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  className="text-2xl"
                  fill="white"
                >
                  {node.icon}
                </text>
              </g>
            ))}
          </svg>

          {/* Node Information Panel */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nodes.map(node => (
              <div
                key={node.id}
                className={`modern-card p-8 rounded-2xl transition-all duration-500 transform-gpu ${
                  activeNode === node.id ? 'scale-105 neon-border-enhanced shadow-2xl' : ''
                }`}
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={handleNodeLeave}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mr-4 animate-neon-pulse"
                    style={{ backgroundColor: `${node.color}20`, border: `2px solid ${node.color}` }}
                  >
                    <span className="text-3xl">{node.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-white">{node.title}</h3>
                </div>
                <p className="text-primary-white opacity-85 leading-relaxed">
                  {node.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-secondary-cyan">
                  <span className="w-2 h-2 bg-secondary-cyan rounded-full mr-2 animate-pulse"></span>
                  Connected to {node.connections.length} systems
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow Indicators */}
        <div className="mt-16 flex justify-center">
          <div className="glass-subtle p-6 rounded-2xl">
            <div className="flex items-center space-x-6">
              <span className="text-primary-white font-semibold">Process Flow:</span>
              <div className="flex space-x-4">
                {[0, 1, 2, 3].map(phase => (
                  <div
                    key={phase}
                    className={`w-4 h-4 rounded-full transition-all duration-500 ${
                      animationPhase >= phase 
                        ? 'bg-secondary-cyan shadow-lg animate-neon-pulse' 
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-secondary-cyan text-sm font-medium">
                {animationPhase === 0 && "Initialization"}
                {animationPhase === 1 && "Data Collection"}
                {animationPhase === 2 && "Verification"}
                {animationPhase === 3 && "Complete"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveInfographic;