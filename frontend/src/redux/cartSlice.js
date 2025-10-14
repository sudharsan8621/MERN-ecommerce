import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async () => {
    const response = await api.get('/cart')
    return response.data
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const response = await api.post('/cart', { productId, quantity })
    return response.data
  }
)

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async (items) => {
    const response = await api.put('/cart', { items })
    return response.data
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {
    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        state.items = JSON.parse(savedCart)
      }
    },
    addToCartLocal: (state, action) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      )
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    updateCartLocal: (state, action) => {
      state.items = action.payload
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload.items || []
      })
  }
})

export const { loadCart, addToCartLocal, updateCartLocal, clearCart } = cartSlice.actions
export default cartSlice.reducer