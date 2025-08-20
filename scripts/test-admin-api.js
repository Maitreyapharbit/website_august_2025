#!/usr/bin/env node

/**
 * Test Admin API Endpoints
 * Tests the admin authentication and API functionality
 */

const fetch = require('node-fetch');
require('dotenv').config();

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';

async function testAdminAPI() {
  console.log('🧪 Testing Pharbit Admin API...');
  console.log(`🌐 API Base URL: ${API_BASE}`);
  console.log('');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing health check...');
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status || 'OK');
    console.log('');

    // Test 2: Admin Login
    console.log('2️⃣ Testing admin login...');
    const loginResponse = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@pharbit.com',
        password: 'F#034180427932al'
      })
    });

    const loginData = await loginResponse.json();
    
    if (loginData.success) {
      console.log('✅ Admin login successful');
      console.log('👤 User:', loginData.data.user.email);
      console.log('🔑 Role:', loginData.data.user.role);
      
      const adminToken = loginData.data.tokens.access;
      console.log('🎫 Token received');
      console.log('');

      // Test 3: Token Verification
      console.log('3️⃣ Testing token verification...');
      const verifyResponse = await fetch(`${API_BASE}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const verifyData = await verifyResponse.json();
      
      if (verifyData.success) {
        console.log('✅ Token verification successful');
        console.log('👤 Verified user:', verifyData.data.user.email);
        console.log('');
      } else {
        console.log('❌ Token verification failed:', verifyData.error);
      }

      // Test 4: Get Blogs (Public)
      console.log('4️⃣ Testing blogs API (public)...');
      const blogsResponse = await fetch(`${API_BASE}/api/blogs`);
      const blogsData = await blogsResponse.json();
      
      if (blogsData.success) {
        console.log('✅ Blogs API working');
        console.log('📝 Total blogs:', blogsData.data.total);
        console.log('📄 Blogs returned:', blogsData.data.blogs.length);
        console.log('');
      } else {
        console.log('❌ Blogs API failed:', blogsData.error);
      }

      // Test 5: Get Contacts (Admin Only)
      console.log('5️⃣ Testing contacts API (admin only)...');
      const contactsResponse = await fetch(`${API_BASE}/api/contact`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });

      const contactsData = await contactsResponse.json();
      
      if (contactsData.success) {
        console.log('✅ Contacts API working');
        console.log('📧 Total contacts:', contactsData.data.total);
        console.log('📄 Contacts returned:', contactsData.data.contacts.length);
        console.log('');
      } else {
        console.log('❌ Contacts API failed:', contactsData.error);
      }

      // Test 6: Get Company Info (Public)
      console.log('6️⃣ Testing company API (public)...');
      const companyResponse = await fetch(`${API_BASE}/api/company`);
      const companyData = await companyResponse.json();
      
      if (companyData.success) {
        console.log('✅ Company API working');
        console.log('🏢 Company:', companyData.data.name);
        console.log('📧 Email:', companyData.data.email);
        console.log('');
      } else {
        console.log('❌ Company API failed:', companyData.error);
      }

      console.log('🎉 All tests completed!');
      console.log('');
      console.log('🔗 Admin Login URL: ' + `${API_BASE}/admin/login`);
      console.log('📧 Email: admin@pharbit.com');
      console.log('🔑 Password: F#034180427932al');

    } else {
      console.log('❌ Admin login failed:', loginData.error);
      console.log('');
      console.log('💡 Make sure to run the admin setup script first:');
      console.log('   npm run setup:admin');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('1. Make sure the development server is running: npm run dev');
    console.log('2. Check your environment variables in .env.local');
    console.log('3. Run the admin setup script: npm run setup:admin');
  }
}

// Run the tests
testAdminAPI().catch(console.error);