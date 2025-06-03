import React, {  useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';
import './index.css'
import { assets } from '../../assets/assets'


const Navbar = (props) => {
    const history = useHistory()
    const [menu,setMenu] = useState('home')
    const onLogoutClicked = () =>{
        Cookies.remove('jwt_token')
        history.replace('/login')
    }

  return (
    <div className='navbar'>
     <img src={assets.logo} alt='logo' className='logo'/>
        <ul className='nav-menu'>
            <li onClick={() => setMenu('home')} className={`nav-item ${menu === 'home'?'active':''}`}>Home</li>
            <li onClick={() => setMenu('products')} className={`nav-item ${menu === 'products'?'active':''}`}>Products</li>
            <li onClick={() => setMenu('about-us')} className={`nav-item ${menu === 'about-us'?'active':''}`}>About Us</li>
            <li onClick={() => setMenu('contact-us')} className={`nav-item ${menu === 'contact-us'?'active':''}`}>Contact Us</li>
        </ul>
        <div className='navbar-right'>
            <div className='search-bar'>
                <input type='text' placeholder='Search...' className='search-input'/>
                <img src={assets.search_icon} alt='search' className='search-icon'/>
            </div>
            <div className='basket-icon'>
                <img src={assets.basket_icon} alt='basket' className='basket-icon-img'/>
            </div>
            <button className='login-button' onClick={onLogoutClicked}>LogOut</button>
        </div>
    </div>
  )
}

export default Navbar
