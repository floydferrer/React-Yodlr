import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  console.log('elloe')

  return (
    <div>
      <h1>Yodlr Design Challenge</h1>
      <p className='homepage-nav' onClick={() => navigate('/signup')}>Registration Page</p>
      <p className='homepage-nav' onClick={() => navigate('/admin')}>Admin Page</p>
      <p className='homepage-nav' onClick={() => navigate('/users')}>Users Page</p>
    </div>
  )
}

export default Homepage
