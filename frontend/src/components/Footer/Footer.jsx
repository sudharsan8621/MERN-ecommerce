import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const categories = [
    'Electronics',
    'Apparel',
    'Home',
    'Sports',
    'Accessories'
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li key={category}>
                <Link to={`/products?category=${category}`}>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <p>Follow us on social media</p>
          <div className="social-links">
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📷</a>
            <a href="#">💼</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 E-Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer