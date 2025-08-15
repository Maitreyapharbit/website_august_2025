import { NextResponse } from 'next/server';

const timelineData = [
  {
    id: '1',
    date: 'August 2025',
    title: 'Development Begins',
    description: 'Initial blockchain development and smart contract creation',
    status: 'current',
    details: [
      'Core blockchain architecture design',
      'Smart contract development',
      'IoT integration planning',
      'Team expansion and partnerships'
    ],
    progress: 25,
  },
  {
    id: '2',
    date: 'January 2026',
    title: 'Initial Milestone',
    description: 'First phase testing and pilot program launch',
    status: 'upcoming',
    details: [
      'Beta testing with select partners',
      'Supply chain integration tests',
      'Security audits and compliance',
      'User interface development'
    ],
    progress: 0,
  },
  {
    id: '3',
    date: 'August 2026',
    title: 'Full Blockchain Launch',
    description: 'Complete platform deployment across Germany',
    status: 'upcoming',
    details: [
      'Full platform deployment',
      'Nationwide pharmaceutical integration',
      'Complete IoT sensor network',
      'Regulatory compliance certification'
    ],
    progress: 0,
  },
  {
    id: '4',
    date: 'Future Goals',
    title: '10 Million PHB Coins',
    description: 'Cryptocurrency launch and ecosystem expansion',
    status: 'upcoming',
    details: [
      'PHB cryptocurrency launch',
      'Token economy implementation',
      'International expansion planning',
      'Advanced AI integration'
    ],
    progress: 0,
  },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      success: true,
      data: timelineData,
      total: timelineData.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch timeline data' },
      { status: 500 }
    );
  }
}