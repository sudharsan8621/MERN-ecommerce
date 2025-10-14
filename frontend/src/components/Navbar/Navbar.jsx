import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { items } = useSelector(state => state.cart)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${searchQuery}`)
    setSearchQuery('')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          E-Shop
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/products" className="navbar-link">
            Products
          </Link>
          
          <Link to="/cart" className="navbar-link cart-link">
            🛒
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="navbar-link">
                👤
              </Link>
              <button onClick={handleLogout} className="navbar-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth/login" className="navbar-link">
              Login
            </Link>
          )}

          <DarkModeToggle />
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  )
}

export default Navbar