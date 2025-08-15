import { NextResponse } from 'next/server';

// Sample blog data - in a real app, this would come from a database
const blogs = [
  {
    id: '1',
    title: 'Blockchain Revolution in German Pharmaceuticals',
    excerpt: 'Exploring how blockchain technology is set to transform pharmaceutical supply chains across Germany, ensuring transparency and security.',
    content: 'Full blog content would go here...',
    date: '2025-01-15',
    readTime: '5 min read',
    category: 'Technology',
    author: 'Pharbit Team',
    tags: ['blockchain', 'pharmaceuticals', 'germany', 'supply-chain'],
  },
  {
    id: '2',
    title: 'Smart Contracts: Securing Drug Supply Chains',
    excerpt: 'Learn how smart contracts ensure authenticity and traceability in pharmaceutical distribution, preventing counterfeit drugs.',
    content: 'Full blog content would go here...',
    date: '2025-01-10',
    readTime: '7 min read',
    category: 'Innovation',
    author: 'Pharbit Team',
    tags: ['smart-contracts', 'security', 'authenticity'],
  },
  {
    id: '3',
    title: 'IoT Integration with Blockchain Technology',
    excerpt: 'Combining IoT sensors with blockchain for real-time monitoring of pharmaceutical products throughout the supply chain.',
    content: 'Full blog content would go here...',
    date: '2025-01-05',
    readTime: '6 min read',
    category: 'IoT',
    author: 'Pharbit Team',
    tags: ['iot', 'sensors', 'monitoring', 'real-time'],
  },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: blogs,
      total: blogs.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}