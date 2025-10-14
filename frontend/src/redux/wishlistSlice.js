import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const response = await api.get('/wishlist')
    return response.data
  }
)

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId) => {
    const response = await api.post('/wishlist', { productId })
    return response.data
  }
)

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items || []
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items || []
      })
  }
})

export default wishlistSlice.reducer