import { NextResponse } from 'next/server';

const companyStats = {
  founded: '2025',
  headquarters: 'Germany',
  industry: 'Blockchain & Pharmaceuticals',
  employees: '10-50',
  stage: 'Development',
  funding: 'Seed Stage',
  partnerships: [
    'German Pharmaceutical Companies',
    'Blockchain Technology Partners',
    'IoT Sensor Manufacturers',
    'Regulatory Compliance Experts'
  ],
  milestones: [
    {
      date: '2025-01-01',
      title: 'Company Founded',
      description: 'Pharbit officially established with mission to transform pharmaceutical industry'
    },
    {
      date: '2025-08-01',
      title: 'Development Phase Begins',
      description: 'Start of blockchain platform development and smart contract creation'
    },
    {
      date: '2026-01-01',
      title: 'Beta Testing Launch',
      description: 'Initial pilot program with select pharmaceutical partners'
    },
    {
      date: '2026-08-01',
      title: 'Full Platform Launch',
      description: 'Complete blockchain platform deployment across Germany'
    }
  ],
  technology: {
    blockchain: 'Custom Pharmaceutical Blockchain',
    smartContracts: 'Ethereum-compatible',
    iot: 'Real-time sensor integration',
    security: 'Enterprise-grade encryption',
    compliance: 'German pharmaceutical regulations'
  },
  vision: 'To create the most secure, transparent, and efficient pharmaceutical supply chain in Germany through blockchain technology.',
  mission: 'Transforming pharmaceutical distribution with blockchain innovation, ensuring drug authenticity and supply chain transparency.'
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