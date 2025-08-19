const https = require('https');

const API_BASE = 'https://main.d22x4oiromio4y.amplifyapp.com';

// Helper function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing Pharbit API Endpoints...\n');
  
  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const health = await makeRequest(`${API_BASE}/api/health`);
    console.log(`   Status: ${health.status}`);
    console.log(`   Response:`, health.data);
    console.log('');

    // Test 2: Get Company Info (Public)
    console.log('2. Testing Company Info (Public)...');
    const company = await makeRequest(`${API_BASE}/api/company`);
    console.log(`   Status: ${company.status}`);
    console.log(`   Company:`, company.data?.data?.name || 'Not found');
    console.log('');

    // Test 3: Get Blogs (Public)
    console.log('3. Testing Blogs List (Public)...');
    const blogs = await makeRequest(`${API_BASE}/api/blogs`);
    console.log(`   Status: ${blogs.status}`);
    console.log(`   Blogs count:`, blogs.data?.data?.blogs?.length || 0);
    console.log('');

    // Test 4: Admin Login
    console.log('4. Testing Admin Login...');
    const loginResponse = await makeRequest(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@pharbit.com',
        password: 'F#0341804279321'
      })
    });
    
    console.log(`   Status: ${loginResponse.status}`);
    
    if (loginResponse.data?.success) {
      console.log('   ✅ Login successful');
      const token = loginResponse.data.data.tokens.access;
      
      // Test 5: Token Verification
      console.log('5. Testing Token Verification...');
      const verifyResponse = await makeRequest(`${API_BASE}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(`   Status: ${verifyResponse.status}`);
      console.log(`   Valid: ${verifyResponse.data?.data?.valid || false}`);
      console.log('');

      // Test 6: Create Blog Post (Protected)
      console.log('6. Testing Create Blog Post (Protected)...');
      const createBlogResponse = await makeRequest(`${API_BASE}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Test Blog Post',
          excerpt: 'This is a test blog post created via API',
          content: 'This is the full content of the test blog post. It demonstrates that the API is working correctly.',
          image_url: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg'
        })
      });
      
      console.log(`   Status: ${createBlogResponse.status}`);
      console.log(`   Created: ${createBlogResponse.data?.success || false}`);
      console.log('');

    } else {
      console.log('   ❌ Login failed:', loginResponse.data?.error);
    }

    // Test 7: Submit Contact Form (Public)
    console.log('7. Testing Contact Form Submission (Public)...');
    const contactResponse = await makeRequest(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test contact form submission to verify the API is working.'
      })
    });
    
    console.log(`   Status: ${contactResponse.status}`);
    console.log(`   Submitted: ${contactResponse.data?.success || false}`);
    console.log('');

    console.log('🎉 API Testing Complete!');
    
  } catch (error) {
    console.error('❌ API Test Error:', error);
  }
}

// Run tests
testAPI();