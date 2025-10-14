import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../redux/orderSlice'
import { clearCart } from '../../redux/cartSlice'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const { isLoading } = useSelector(state => state.orders)
  
  const [orderItems, setOrderItems] = useState([])
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    // Check for Buy Now item
    const buyNowItem = localStorage.getItem('buyNowItem')
    if (buyNowItem) {
      setOrderItems([JSON.parse(buyNowItem)])
      localStorage.removeItem('buyNowItem')
    } else if (items.length > 0) {
      setOrderItems(items)
    } else {
      navigate('/cart')
    }
  }, [user, items, navigate])

  const subtotal = orderItems.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0)
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal + shipping

  const handlePayment = async () => {
    setPaymentProcessing(true)
    
    // Simulate payment processing
    setTimeout(async () => {
      const orderData = {
        items: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shipping
      }

      await dispatch(createOrder(orderData))
      dispatch(clearCart())
      
      setPaymentProcessing(false)
      navigate('/profile')
    }, 2000)
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-layout">
          <div className="checkout-form">
            <section className="checkout-section">
              <h2>Delivery Information</h2>
              <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" value={user?.email || ''} readOnly />
                <input type="tel" placeholder="Phone Number" required />
                <textarea placeholder="Delivery Address" rows="3" required></textarea>
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="State" required />
                <input type="text" placeholder="PIN Code" required />
              </form>
            </section>

            <section className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label>
                  <input type="radio" name="payment" defaultChecked />
                  <span>Cash on Delivery</span>
                </label>
                <label>
                  <input type="radio" name="payment" />
                  <span>Credit/Debit Card</span>
                </label>
                <label>
                  <input type="radio" name="payment" />
                  <span>UPI</span>
                </label>
                <label>
                  <input type="radio" name="payment" />
                  <span>Net Banking</span>
                </label>
              </div>
            </section>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.title}</span>
                  <span>x{item.quantity}</span>
                  <span>₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button 
              onClick={handlePayment} 
              className="btn-primary pay-btn"
              disabled={paymentProcessing || isLoading}
            >
              {paymentProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout