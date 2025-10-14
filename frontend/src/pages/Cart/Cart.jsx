import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import { updateCart, updateCartLocal } from '../../redux/cartSlice'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)

  const subtotal = items.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedItems = items.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    ).filter(item => item.quantity > 0)

    if (user) {
      dispatch(updateCart(updatedItems))
    } else {
      dispatch(updateCartLocal(updatedItems))
    }
  }

  const handleRemoveItem = (productId) => {
    const updatedItems = items.filter(item => item.productId !== productId)
    
    if (user) {
      dispatch(updateCart(updatedItems))
    } else {
      dispatch(updateCartLocal(updatedItems))
    }
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button onClick={() => navigate('/products')} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
                {subtotal < 999 && <small> (Free above ₹999)</small>}
              </span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary checkout-btn">
              Proceed to Checkout
            </button>
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart