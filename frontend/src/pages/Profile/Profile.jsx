import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../redux/orderSlice'
import { fetchWishlist } from '../../redux/wishlistSlice'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orders } = useSelector(state => state.orders)
  const { items: wishlistItems } = useSelector(state => state.wishlist)

  useEffect(() => {
    if (!user) {
      navigate('/auth/login')
      return
    }
    dispatch(fetchOrders())
    dispatch(fetchWishlist())
  }, [dispatch, user, navigate])

  if (!user) return null

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>
        
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="profile-section">
          <h2>My Wishlist ({wishlistItems.length})</h2>
          {wishlistItems.length === 0 ? (
            <p>No items in wishlist</p>
          ) : (
            <div className="wishlist-grid">
              {wishlistItems.map(item => (
                <div key={item.productId} className="wishlist-item">
                  <img 
                    src={`/src/assets/images/products/${item.image}`} 
                    alt={item.title} 
                  />
                  <h4>{item.title}</h4>
                  <p>₹{item.priceINR.toLocaleString('en-IN')}</p>
                  <button 
                    onClick={() => navigate(`/products/${item.productId}`)}
                    className="view-product-btn"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-section">
          <h2>Order History ({orders.length})</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span>Order #{order._id.slice(-8)}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className={`order-status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-row">
                        <span>{item.title}</span>
                        <span>{item.category}</span>
                        <span>x{item.quantity}</span>
                        <span>₹{item.totalLine.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <strong>Total: ₹{order.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile