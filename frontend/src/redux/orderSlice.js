import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../services/api'

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    const response = await api.post('/orders', orderData)
    return response.data
  }
)

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await api.get('/orders')
    return response.data
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentOrder = action.payload
        state.orders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
  }
})

export default orderSlice.reducer