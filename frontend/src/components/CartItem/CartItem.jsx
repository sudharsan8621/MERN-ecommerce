import React from 'react'
import './CartItem.css'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const imagePath = `/images/products/${item.image}`

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onUpdateQuantity(item.productId, newQuantity)
    }
  }

  return (
    <div className="cart-item">
      <img src={imagePath} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="cart-item-price">₹{item.priceINR.toLocaleString('en-IN')}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
      </div>
      <div className="cart-item-total">
        ₹{(item.priceINR * item.quantity).toLocaleString('en-IN')}
      </div>
      <button className="cart-item-remove" onClick={() => onRemove(item.productId)}>
        🗑️
      </button>
    </div>
  )
}

export default CartItem