import axios from 'axios'

// Determine the API URL based on environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000, // 10 seconds timeout
  withCredentials: false // Set to true if you need to send cookies
})

// Request interceptor to add token and log requests
api.interceptors.request.use(
  config => {
    // Add auth token if it exists
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log the request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} Request to:`, config.url)
      if (config.data) {
        console.log('📦 Request Data:', config.data)
      }
    }

    return config
  },
  error => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling and logging
api.interceptors.response.use(
  response => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ Response from ${response.config.url}:`, response.data)
    }
    return response
  },
  error => {
    // Log error details
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      })
    }

    // Handle specific error cases
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Request timeout')
      error.message = 'Request timeout. Please try again.'
    } else if (error.code === 'ERR_NETWORK') {
      console.error('🔌 Network error - Backend might not be running')
      error.message = 'Cannot connect to server. Please ensure the backend is running on port 5000.'
    } else if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
          }
          error.message = 'Please login to continue'
          break
        case 403:
          error.message = 'You do not have permission to perform this action'
          break
        case 404:
          error.message = error.response.data?.message || 'Resource not found'
          break
        case 400:
          error.message = error.response.data?.message || 'Invalid request'
          break
        case 500:
          error.message = 'Server error. Please try again later.'
          break
        default:
          error.message = error.response.data?.message || 'Something went wrong'
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('📡 No response received from server')
      error.message = 'No response from server. Please check if the backend is running.'
    }

    return Promise.reject(error)
  }
)

// API methods for different endpoints

// Auth endpoints
api.auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
}

// Product endpoints
api.products = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products', { params: { q: query } })
}

// Cart endpoints
api.cart = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart', data),
  update: (data) => api.put('/cart', data),
  remove: (productId) => api.delete(`/cart/${productId}`)
}

// Order endpoints
api.orders = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`)
}

// Wishlist endpoints
api.wishlist = {
  get: () => api.get('/wishlist'),
  toggle: (productId) => api.post('/wishlist', { productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`)
}

// Health check
api.health = () => api.get('/health')

// Test connection function
api.testConnection = async () => {
  try {
    const response = await api.get('/health')
    console.log('✅ Backend connection successful:', response.data)
    return true
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message)
    return false
  }
}

// Export the configured axios instance
export default api

// Also export specific endpoint groups for convenience
export const authAPI = api.auth
export const productsAPI = api.products
export const cartAPI = api.cart
export const ordersAPI = api.orders
export const wishlistAPI = api.wishlist