// CORS headers for Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

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

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return res.status(200).json({
      success: true,
      data: timelineData,
      total: timelineData.length,
    });
  } catch (error) {
    console.error('Timeline API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch timeline data'
    });
  }
}