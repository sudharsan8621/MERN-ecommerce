import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../../redux/productSlice'
import { addToCart, addToCartLocal } from '../../redux/cartSlice'
import { toggleWishlist } from '../../redux/wishlistSlice'
import Rating from '../../components/Rating/Rating'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentProduct: product, isLoading } = useSelector(state => state.products)
  const { user } = useSelector(state => state.auth)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  if (isLoading || !product) {
    return <div className="loading">Loading...</div>
  }

  const isInWishlist = wishlistItems.some(item => 
    item.productId === product._id
  )

  const handleAddToCart = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    const cartItem = {
      productId: product._id,
      title: product.title,
      priceINR: product.priceINR,
      quantity,
      image: product.images[0]
    }

    if (user) {
      dispatch(addToCart({ productId: product._id, quantity }))
    } else {
      dispatch(addToCartLocal(cartItem))
    }
  }

  const handleBuyNow = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    const orderItem = {
      productId: product._id,
      title: product.title,
      priceINR: product.priceINR,
      quantity,
      image: product.images[0]
    }

    localStorage.setItem('buyNowItem', JSON.stringify(orderItem))
    navigate('/checkout')
  }

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/auth/login')
      return
    }

    dispatch(toggleWishlist(product._id))
  }

  const imagePath = `/src/assets/images/products/${product.images[selectedImage]}`

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-layout">
          <div className="product-images">
            <div className="main-image">
              <img src={imagePath} alt={product.title} />
            </div>
            {product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/src/assets/images/products/${image}`}
                    alt={`${product.title} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-category">{product.category}</p>
            <Rating value={product.rating} />
            <div className="product-price">
              ₹{product.priceINR.toLocaleString('en-IN')}
            </div>
            <p className="product-description">{product.description}</p>
            
            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
              />
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
            </div>

            <div className="product-actions">
              <button 
                className="btn-primary add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                className="btn-buy-now"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </button>
              <button 
                className={`btn-wishlist ${isInWishlist ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail