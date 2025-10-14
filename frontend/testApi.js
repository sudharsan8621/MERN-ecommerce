// Run this with: node testApi.js
const axios = require('axios');

async function testBackend() {
  try {
    console.log('Testing backend connection...\n');
    
    // Test health endpoint
    const health = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Health check:', health.data);
    
    // Test products endpoint
    const products = await axios.get('http://localhost:5000/api/products');
    console.log('✅ Products found:', products.data.length);
    
    // Test registration
    const testUser = {
      username: 'testuser' + Date.now(),
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    const register = await axios.post('http://localhost:5000/api/auth/register', testUser);
    console.log('✅ Registration successful:', register.data.username);
    
    console.log('\n✅ All tests passed! Backend is working correctly.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  Backend server is not running!');
      console.error('Please start the backend with: npm run dev');
    }
  }
}

testBackend();