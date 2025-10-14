import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import banner1 from '../../assets/images/banners/banner1.jpg'
import banner2 from '../../assets/images/banners/banner2.jpg'
import banner3 from '../../assets/images/banners/banner3.jpg'
import './Banner.css'

function Banner() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const banners = [
    { image: banner1, title: 'Summer Sale', subtitle: 'Up to 50% off' },
    { image: banner2, title: 'New Arrivals', subtitle: 'Check out latest products' },
    { image: banner3, title: 'Free Shipping', subtitle: 'On orders over ₹999' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleShopNow = () => {
    navigate('/products')
  }

  return (
    <div className="banner">
      <div className="banner-slides">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="banner-content">
              <h1>{banner.title}</h1>
              <p>{banner.subtitle}</p>
              <button className="btn-primary" onClick={handleShopNow}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="banner-dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner