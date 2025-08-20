#!/usr/bin/env node

/**
 * Test script for admin API endpoints
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';
const ADMIN_EMAIL = 'admin@pharbit.com';
const ADMIN_PASSWORD = 'F#034180427932al';

let adminToken = null;

async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

async function testAdminLogin() {
  console.log('🔐 Testing admin login...');
  
  const result = await makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    })
  });

  if (result.status === 200 && result.data.success) {
    adminToken = result.data.data.tokens.access;
    console.log('✅ Admin login successful');
    console.log('   Token:', adminToken.substring(0, 20) + '...');
    return true;
  } else {
    console.error('❌ Admin login failed:', result.data?.error || result.error);
    return false;
  }
}

async function testGetProfile() {
  console.log('👤 Testing get admin profile...');
  
  const result = await makeRequest('/api/auth/profile');

  if (result.status === 200 && result.data.success) {
    console.log('✅ Profile retrieved successfully');
    console.log('   Email:', result.data.data.email);
    console.log('   Role:', result.data.data.role);
  } else {
    console.error('❌ Get profile failed:', result.data?.error || result.error);
  }
}

async function testBlogOperations() {
  console.log('📝 Testing blog operations...');

  // Test create blog
  const createResult = await makeRequest('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Blog Post',
      excerpt: 'This is a test blog post excerpt',
      content: 'This is the full content of the test blog post. It contains detailed information about the topic.',
      image_url: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'published'
    })
  });

  if (createResult.status === 201 && createResult.data.success) {
    console.log('✅ Blog created successfully');
    const blogId = createResult.data.data.id;
    console.log('   Blog ID:', blogId);

    // Test update blog
    const updateResult = await makeRequest(`/api/blogs/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: 'Updated Test Blog Post',
        excerpt: 'This is an updated test blog post excerpt'
      })
    });

    if (updateResult.status === 200 && updateResult.data.success) {
      console.log('✅ Blog updated successfully');
    } else {
      console.error('❌ Blog update failed:', updateResult.data?.error || updateResult.error);
    }

    // Test delete blog
    const deleteResult = await makeRequest(`/api/blogs/${blogId}`, {
      method: 'DELETE'
    });

    if (deleteResult.status === 200 && deleteResult.data.success) {
      console.log('✅ Blog deleted successfully');
    } else {
      console.error('❌ Blog delete failed:', deleteResult.data?.error || deleteResult.error);
    }

  } else {
    console.error('❌ Blog creation failed:', createResult.data?.error || createResult.error);
  }
}

async function testCompanyOperations() {
  console.log('🏢 Testing company operations...');

  // Test get company info (public)
  const getResult = await makeRequest('/api/company');

  if (getResult.status === 200 && getResult.data.success) {
    console.log('✅ Company info retrieved successfully');
    console.log('   Name:', getResult.data.data.name);
    console.log('   Email:', getResult.data.data.email);
  } else {
    console.error('❌ Get company info failed:', getResult.data?.error || getResult.error);
  }

  // Test update company info (admin only)
  const updateResult = await makeRequest('/api/company', {
    method: 'PUT',
    body: JSON.stringify({
      phone: '+4917697711873',
      email: 'info@pharbit.com',
      address: 'An Europakanal 6, 91056 Erlangen, Germany'
    })
  });

  if (updateResult.status === 200 && updateResult.data.success) {
    console.log('✅ Company info updated successfully');
  } else {
    console.error('❌ Company info update failed:', updateResult.data?.error || updateResult.error);
  }
}

async function testPublicEndpoints() {
  console.log('🌐 Testing public endpoints...');

  // Test get blogs (public)
  const blogsResult = await makeRequest('/api/blogs');
  
  if (blogsResult.status === 200 && blogsResult.data.success) {
    console.log('✅ Public blogs endpoint working');
    console.log('   Total blogs:', blogsResult.data.data.total);
  } else {
    console.error('❌ Public blogs endpoint failed:', blogsResult.data?.error || blogsResult.error);
  }
}

async function runTests() {
  console.log('🧪 Starting Pharbit Admin API Tests');
  console.log('🌐 Base URL:', BASE_URL);
  console.log('');

  // Test public endpoints first
  await testPublicEndpoints();
  console.log('');

  // Test admin login
  const loginSuccess = await testAdminLogin();
  if (!loginSuccess) {
    console.log('');
    console.log('❌ Cannot proceed with protected endpoint tests without valid admin token');
    console.log('');
    console.log('💡 Make sure to:');
    console.log('   1. Run the admin setup script: node scripts/setup-admin-production.js');
    console.log('   2. Ensure your Supabase database is properly configured');
    console.log('   3. Check your environment variables');
    return;
  }

  console.log('');

  // Test protected endpoints
  await testGetProfile();
  console.log('');
  
  await testBlogOperations();
  console.log('');
  
  await testCompanyOperations();
  console.log('');

  console.log('🎉 All tests completed!');
}

// Run the tests
runTests().catch(console.error);