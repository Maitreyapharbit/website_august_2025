import { NextResponse } from 'next/server';

const companyStats = {
  founded: '2025',
  headquarters: 'Germany',
  industry: 'Blockchain Technology & Pharmaceutical Supply Chain',
  employees: '5-15',
  stage: 'Early Development Phase',
  funding: 'Bootstrap/Pre-Seed',
  partnerships: [
    'German Pharmaceutical Distributors',
    'Blockchain Infrastructure Providers',
    'IoT Hardware Manufacturers',
    'Regulatory Compliance Consultants',
    'Supply Chain Technology Partners'
  ],
  milestones: [
    {
      date: '2025-01-01',
      title: 'Pharbit Founded',
      description: 'Company established with vision to revolutionize pharmaceutical supply chain transparency in Germany'
    },
    {
      date: '2025-06-01',
      title: 'Core Team Assembly',
      description: 'Key blockchain developers and pharmaceutical industry experts join the team'
    },
    {
      date: '2025-09-01',
      title: 'Platform Development Launch',
      description: 'Begin development of blockchain infrastructure and smart contract architecture'
    },
    {
      date: '2026-01-01',
      title: 'Pilot Program Initiation',
      description: 'Launch beta testing with select German pharmaceutical companies'
    },
    {
      date: '2026-08-01',
      title: 'Full Platform Deployment',
      description: 'Complete blockchain platform launch across German pharmaceutical market'
    },
    {
      date: '2027-01-01',
      title: 'PHB Token Launch',
      description: 'Introduction of PHB cryptocurrency with target of 10 million coins'
    }
  ],
  technology: {
    blockchain: 'Custom Ethereum-Compatible Blockchain',
    smartContracts: 'Solidity-based Smart Contracts',
    iot: 'Temperature & Humidity Monitoring Sensors',
    security: 'End-to-End Encryption & Multi-Signature Wallets',
    compliance: 'German GDP & EU Pharmaceutical Regulations',
    integration: 'RESTful APIs & Real-time WebSocket Connections'
  },
  vision: 'To establish the most secure, transparent, and efficient pharmaceutical supply chain ecosystem in Germany through innovative blockchain technology, ensuring every medication\'s journey from manufacturer to patient is fully traceable and verified.',
  mission: 'Pharbit is dedicated to revolutionizing pharmaceutical supply chain management by leveraging blockchain technology, IoT sensors, and smart contracts to eliminate counterfeit drugs, ensure cold chain compliance, and provide real-time transparency for all stakeholders in the German pharmaceutical industry.'
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return NextResponse.json({
      success: true,
      data: companyStats,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch company information' },
      { status: 500 }
    );
  }
}