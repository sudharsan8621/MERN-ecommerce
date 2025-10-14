import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/ProductCard/ProductCard'
import { fetchProducts, setFilters, clearFilters } from '../../redux/productSlice'
import './Products.css'

function Products() {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { products, isLoading, filters } = useSelector(state => state.products)
  const [viewMode, setViewMode] = useState('grid')
  const [localFilters, setLocalFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sort: ''
  })

  const categories = ['Electronics', 'Apparel', 'Home', 'Sports', 'Accessories']

  useEffect(() => {
    const queryParams = {
      q: searchParams.get('q') || '',
      category: searchParams.get('category') || localFilters.category,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
      rating: localFilters.rating,
      sort: localFilters.sort
    }
    dispatch(fetchProducts(queryParams))
  }, [dispatch, searchParams, localFilters])

  const handleFilterChange = (filterType, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleClearFilters = () => {
    setLocalFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sort: ''
    })
    dispatch(clearFilters())
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <h3>Filters</h3>
            
            <div className="filter-section">
              <h4>Category</h4>
              <select 
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <input
                type="number"
                placeholder="Min Price"
                value={localFilters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={localFilters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>

            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <select
                value={localFilters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
              </select>
            </div>

            <button onClick={handleClearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </aside>

          <div className="products-main">
            <div className="products-header">
              <h1>
                {searchParams.get('q') 
                  ? `Search Results for "${searchParams.get('q')}"` 
                  : 'All Products'}
              </h1>
              <div className="products-controls">
                <select
                  value={localFilters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="view-mode-toggle">
                  <button
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    ⊞
                  </button>
                  <button
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              <div className={`products-display ${viewMode}`}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products