import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'
import ProductCard from '../../components/ProductCard/ProductCard'
import { fetchProducts } from '../../redux/productSlice'
import './Home.css'

function Home() {
  const dispatch = useDispatch()
  const { products = [], isLoading, error } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Ensure products is an array before slicing
  const featuredProducts = Array.isArray(products) ? products.slice(0, 8) : []
  
  const categories = [
    { name: 'Electronics', icon: '📱' },
    { name: 'Apparel', icon: '👕' },
    { name: 'Home', icon: '🏠' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Accessories', icon: '👜' }
  ]

  return (
    <div className="home">
      <Banner />
      
      <div className="container">
        <section className="featured-categories">
          <h2>Shop by Category</h2>
          <div className="category-grid">
            {categories.map(category => (
              <div key={category.name} className="category-card">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-products">
          <h2>Featured Products</h2>
          {error && (
            <div className="error-message">
              Error loading products. Please make sure the backend server is running.
            </div>
          )}
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              No products available. Please run the seed script.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home