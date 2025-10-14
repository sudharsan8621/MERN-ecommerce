import api from '../services/api'

// Function to test if backend is accessible
export const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...')
  console.log(`📍 API URL: ${api.defaults.baseURL}`)
  
  try {
    // Test health endpoint
    const healthResponse = await api.health()
    console.log('✅ Health check passed:', healthResponse.data)
    
    // Test products endpoint (doesn't require auth)
    const productsResponse = await api.products.getAll()
    console.log(`✅ Products endpoint working. Found ${productsResponse.data.length} products`)
    
    return {
      success: true,
      message: 'Backend is connected and working properly',
      health: healthResponse.data,
      productsCount: productsResponse.data.length
    }
  } catch (error) {
    console.error('❌ Backend connection test failed')
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    })
    
    return {
      success: false,
      message: error.message,
      error: error
    }
  }
}

// Auto-run test in development mode
if (import.meta.env.DEV) {
  window.testBackend = testBackendConnection
  console.log('💡 Tip: Run window.testBackend() in console to test backend connection')
}