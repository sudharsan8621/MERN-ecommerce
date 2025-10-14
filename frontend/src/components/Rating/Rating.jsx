import React from 'react'
import './Rating.css'

function Rating({ value, onChange, readonly = true }) {
  const stars = [1, 2, 3, 4, 5]

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating)
    }
  }

  return (
    <div className="rating">
      {stars.map(star => (
        <span
          key={star}
          className={`star ${star <= value ? 'filled' : ''} ${!readonly ? 'clickable' : ''}`}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
      <span className="rating-value">({value.toFixed(1)})</span>
    </div>
  )
}

export default Rating