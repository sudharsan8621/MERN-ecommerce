import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, addToCartLocal } from '../../redux/cartSlice'
import { toggleWishlist } from '../../redux/wishlistSlice'
import Rating from '../Rating/Rating'
import './ProductCard.css'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const isInWishlist = wishlistItems.some(item => 
    item.productId === product._id
  )

  const handleCardClick = () => {
    navigate(`/products/${product._id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    
    if (!user) {
      navigate('/auth/login')
      return
    }

    const cartItem = {
      productId: product._id,
      title: product.title,
      priceINR: product.priceINR,
      quantity: 1,
      image: product.images[0]
    }

    if (user) {
      dispatch(addToCart({ productId: product._id, quantity: 1 }))
    } else {
      dispatch(addToCartLocal(cartItem))
    }
  }

  const handleWishlistToggle = (e) => {
    e.stopPropagation()
    
    if (!user) {
      navigate('/auth/login')
      return
    }

    dispatch(toggleWishlist(product._id))
  }

  const imagePath = `/src/assets/images/products/${product.images[0]}`

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-image">
        <img src={imagePath} alt={product.title} />
        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-card-content">
        <h3>{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <Rating value={product.rating} />
        <div className="product-card-footer">
          <span className="product-price">₹{product.priceINR.toLocaleString('en-IN')}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard