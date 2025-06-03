import React from 'react'
import './index.css'

const Header = () => {
  return (
    <div  className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here</h2>
        <p>We deliver food to your doorstep</p>
        <button className='header-button'>View Cart</button>
      </div>
    </div>
  )
}

export default Header
