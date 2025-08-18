'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
}

interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  lastUpdate: string;
}

const DeveloperPortalPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'sdk' | 'docs'>('api');
  const [typingIndex, setTypingIndex] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);

  const codeSnippets: CodeSnippet[] = [
    {
      id: 'verify-drug',
      title: 'Verify Drug Authenticity',
      language: 'javascript',
      code: `// Verify pharmaceutical product authenticity
import { PharbitSDK } from '@pharbit/sdk';

const pharbit = new PharbitSDK({
  apiKey: process.env.PHARBIT_API_KEY,
  network: 'mainnet'
});

async function verifyDrug(productId, batchNumber) {
  try {
    const verification = await pharbit.products.verify({
      productId,
      batchNumber,
      includeSupplyChain: true
    });
    
    return {
      isAuthentic: verification.isValid,
      confidence: verification.confidenceScore,
      supplyChain: verification.journey,
      lastVerified: verification.timestamp
    };
  } catch (error) {
    console.error('Verification failed:', error);
    throw new Error('Unable to verify product');
  }
}

// Usage example
const result = await verifyDrug('DRUG123', 'BATCH456');
console.log('Product is authentic:', result.isAuthentic);`,
      description: 'Verify the authenticity of pharmaceutical products using blockchain records'
    },
    {
      id: 'track-shipment',
      title: 'Track Shipment',
      language: 'python',
      code: `# Track pharmaceutical shipment in real-time
from pharbit import PharbitClient
import asyncio

client = PharbitClient(
    api_key=os.getenv('PHARBIT_API_KEY'),
    environment='production'
)

async def track_shipment(shipment_id):
    """Track shipment with real-time IoT data"""
    try:
        shipment = await client.shipments.get(shipment_id)
        
        # Get real-time sensor data
        sensor_data = await client.sensors.get_latest(
            shipment_id=shipment_id
        )
        
        return {
            'status': shipment.status,
            'location': shipment.current_location,
            'temperature': sensor_data.temperature,
            'humidity': sensor_data.humidity,
            'estimated_arrival': shipment.eta,
            'alerts': shipment.active_alerts
        }
    except Exception as e:
        print(f"Tracking error: {e}")
        return None

# Real-time tracking
tracking_data = await track_shipment('SHIP789')
print(f"Current temperature: {tracking_data['temperature']}°C")`,
      description: 'Real-time tracking of pharmaceutical shipments with IoT sensor data'
    },
    {
      id: 'smart-contract',
      title: 'Smart Contract Integration',
      language: 'solidity',
      code: `// Pharmaceutical Supply Chain Smart Contract
pragma solidity ^0.8.19;

contract PharmaSupplyChain {
    struct Drug {
        string productId;
        string batchNumber;
        address manufacturer;
        uint256 manufactureDate;
        uint256 expiryDate;
        bool isAuthentic;
        string[] supplyChainSteps;
    }
    
    mapping(bytes32 => Drug) public drugs;
    mapping(address => bool) public authorizedManufacturers;
    
    event DrugRegistered(bytes32 indexed drugHash, string productId);
    event SupplyChainUpdated(bytes32 indexed drugHash, string step);
    
    modifier onlyAuthorized() {
        require(authorizedManufacturers[msg.sender], "Not authorized");
        _;
    }
    
    function registerDrug(
        string memory _productId,
        string memory _batchNumber,
        uint256 _expiryDate
    ) external onlyAuthorized {
        bytes32 drugHash = keccak256(abi.encodePacked(_productId, _batchNumber));
        
        drugs[drugHash] = Drug({
            productId: _productId,
            batchNumber: _batchNumber,
            manufacturer: msg.sender,
            manufactureDate: block.timestamp,
            expiryDate: _expiryDate,
            isAuthentic: true,
            supplyChainSteps: new string[](0)
        });
        
        emit DrugRegistered(drugHash, _productId);
    }
    
    function updateSupplyChain(
        bytes32 _drugHash,
        string memory _step
    ) external onlyAuthorized {
        require(drugs[_drugHash].isAuthentic, "Drug not found");
        drugs[_drugHash].supplyChainSteps.push(_step);
        emit SupplyChainUpdated(_drugHash, _step);
    }
}`,
      description: 'Smart contract for pharmaceutical supply chain management on blockchain'
    }
  ];

  const githubRepos: GitHubRepo[] = [
    {
      id: 'pharbit-sdk-js',
      name: 'pharbit-sdk-js',
      description: 'Official JavaScript/TypeScript SDK for Pharbit blockchain integration',
      language: 'TypeScript',
      stars: 1247,
      forks: 89,
      lastUpdate: '2 days ago'
    },
    {
      id: 'pharbit-smart-contracts',
      name: 'pharbit-smart-contracts',
      description: 'Solidity smart contracts for pharmaceutical supply chain management',
      language: 'Solidity',
      stars: 892,
      forks: 156,
      lastUpdate: '1 week ago'
    },
    {
      id: 'pharbit-iot-sensors',
      name: 'pharbit-iot-sensors',
      description: 'IoT sensor integration libraries and firmware for temperature monitoring',
      language: 'C++',
      stars: 634,
      forks: 78,
      lastUpdate: '3 days ago'
    },
    {
      id: 'pharbit-api-examples',
      name: 'pharbit-api-examples',
      description: 'Code examples and tutorials for Pharbit API integration',
      language: 'Python',
      stars: 445,
      forks: 123,
      lastUpdate: '5 days ago'
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      // Animate code snippets
      window.gsap.fromTo('.code-container',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.code-container',
            start: 'top 80%'
          }
        }
      );

      // Animate GitHub repos
      window.gsap.fromTo('.repo-card',
        { opacity: 0, x: -50, rotationY: -15 },
        { 
          opacity: 1, 
          x: 0, 
          rotationY: 0,
          duration: 0.6, 
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.repos-grid',
            start: 'top 80%'
          }
        }
      );

      // Typing animation for code
      const currentSnippet = codeSnippets.find(snippet => snippet.id === activeTab) || codeSnippets[0];
      const codeText = currentSnippet.code;
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index < codeText.length) {
          setTypingIndex(index);
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 20);

      return () => clearInterval(typeInterval);
    }
  }, [activeTab]);

  const currentSnippet = codeSnippets.find(snippet => snippet.id === activeTab) || codeSnippets[0];

  return (
    <section className="section modern-section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-6">
            Developer Portal Preview
          </h2>
          <p className="text-xl text-primary-white opacity-90 max-w-4xl mx-auto leading-relaxed">
            Comprehensive developer resources, SDKs, and APIs to integrate Pharbit's blockchain 
            technology into your pharmaceutical applications and systems
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-blue to-secondary-cyan mx-auto mt-8 animate-glow"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Code Examples Section */}
            <div className="code-container">
              <div className="glass-immersive p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-primary-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-secondary-neonGreen rounded-full mr-3 animate-pulse"></span>
                  Code Examples
                </h3>

                {/* Tab Navigation */}
                <div className="flex space-x-2 mb-6">
                  {[
                    { id: 'api', label: 'API Integration', icon: '🔌' },
                    { id: 'sdk', label: 'SDK Usage', icon: '📦' },
                    { id: 'docs', label: 'Smart Contracts', icon: '📋' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-secondary-cyan text-primary-deepBlue neon-border-enhanced'
                          : 'glass-subtle text-primary-white hover:text-secondary-cyan'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Code Display */}
                <div className="code-snippet relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-secondary-cyan">
                      {currentSnippet.title}
                    </h4>
                    <span className="px-3 py-1 bg-secondary-purple/20 text-secondary-purple text-xs font-bold rounded-full">
                      {currentSnippet.language}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <pre className="bg-primary-deepBlue p-6 rounded-2xl overflow-x-auto text-sm border border-secondary-cyan/30">
                      <code className="text-primary-white font-mono">
                        {currentSnippet.code.substring(0, typingIndex)}
                        <span className="animate-pulse">|</span>
                      </code>
                    </pre>
                    
                    {/* Copy Button */}
                    <button className="absolute top-4 right-4 glass-subtle p-2 rounded-lg hover:neon-border transition-all duration-300">
                      <svg className="w-5 h-5 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-primary-white opacity-80 text-sm mt-4 leading-relaxed">
                    {currentSnippet.description}
                  </p>
                </div>

                {/* Quick Links */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#" className="px-4 py-2 glass-subtle rounded-xl text-secondary-cyan hover:neon-border transition-all duration-300 text-sm font-semibold">
                    📚 Full Documentation
                  </a>
                  <a href="#" className="px-4 py-2 glass-subtle rounded-xl text-secondary-cyan hover:neon-border transition-all duration-300 text-sm font-semibold">
                    🚀 Quick Start Guide
                  </a>
                  <a href="#" className="px-4 py-2 glass-subtle rounded-xl text-secondary-cyan hover:neon-border transition-all duration-300 text-sm font-semibold">
                    💬 Developer Support
                  </a>
                </div>
              </div>
            </div>

            {/* GitHub Repositories Section */}
            <div>
              <div className="glass-immersive p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-primary-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-secondary-purple rounded-full mr-3 animate-pulse"></span>
                  Open Source Repositories
                </h3>

                <div className="repos-grid space-y-4">
                  {githubRepos.map((repo) => (
                    <div
                      key={repo.id}
                      className="repo-card glass-subtle p-6 rounded-2xl card-hover transform-gpu"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-primary-white mb-2 flex items-center">
                            <span className="mr-2">📁</span>
                            {repo.name}
                          </h4>
                          <p className="text-primary-white opacity-80 text-sm leading-relaxed">
                            {repo.description}
                          </p>
                        </div>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{
                            backgroundColor: `${getLanguageColor(repo.language)}20`,
                            color: getLanguageColor(repo.language),
                            border: `1px solid ${getLanguageColor(repo.language)}40`
                          }}
                        >
                          {repo.language}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-primary-white opacity-70">
                          <span className="flex items-center">
                            <span className="mr-1">⭐</span>
                            {repo.stars.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">🍴</span>
                            {repo.forks}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">🕒</span>
                            {repo.lastUpdate}
                          </span>
                        </div>
                        <button className="px-4 py-2 glass-subtle rounded-lg text-secondary-cyan hover:neon-border transition-all duration-300 text-sm font-semibold">
                          View Repo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* GitHub Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="text-center glass-subtle p-4 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-neonGreen mb-1">
                      {githubRepos.reduce((sum, repo) => sum + repo.stars, 0).toLocaleString()}
                    </div>
                    <div className="text-primary-white opacity-70 text-sm">Total Stars</div>
                  </div>
                  <div className="text-center glass-subtle p-4 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-cyan mb-1">
                      {githubRepos.reduce((sum, repo) => sum + repo.forks, 0)}
                    </div>
                    <div className="text-primary-white opacity-70 text-sm">Total Forks</div>
                  </div>
                  <div className="text-center glass-subtle p-4 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-gold mb-1">
                      {githubRepos.length}
                    </div>
                    <div className="text-primary-white opacity-70 text-sm">Repositories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Features Grid */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-primary-white mb-12">
              API Features & Capabilities
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🔐', title: 'Authentication', desc: 'Secure API key management' },
                { icon: '📊', title: 'Real-time Data', desc: 'Live IoT sensor feeds' },
                { icon: '🔍', title: 'Product Verification', desc: 'Instant authenticity checks' },
                { icon: '📈', title: 'Analytics', desc: 'Supply chain insights' },
                { icon: '🚨', title: 'Alert System', desc: 'Automated notifications' },
                { icon: '📋', title: 'Compliance', desc: 'Regulatory reporting' },
                { icon: '🌐', title: 'Global Coverage', desc: 'Worldwide accessibility' },
                { icon: '⚡', title: 'High Performance', desc: 'Sub-second response times' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-subtle p-6 rounded-2xl text-center card-hover transform-gpu"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-bold text-primary-white mb-2">{feature.title}</h4>
                  <p className="text-primary-white opacity-80 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get language colors
function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Python': '#3572a5',
    'Solidity': '#aa6746',
    'C++': '#f34b7d',
    'Go': '#00add8',
    'Rust': '#dea584'
  };
  return colors[language] || '#ffffff';
}

export default DeveloperPortalPreview;