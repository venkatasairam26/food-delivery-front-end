import  {  useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css'
import { assets } from '../../assets/assets'


const Navbar = (props) => {
    
    const [menu,setMenu] = useState('home')
    

  return (
    <div className='navbar'>
        <Link to='/'className="nav-link" onClick={() => setMenu('home')}><img src={assets.logo} alt='logo' className='logo'/></Link>
        <ul className='nav-menu'>
            <li onClick={() => setMenu('home')} className={`nav-item ${menu === 'home'?'active':''}`}><Link to='/'className="nav-link">Home</Link></li>
            <li onClick={() => setMenu('about-us')} className={`nav-item ${menu === 'about-us'?'active':''}`}>About Us</li>
            <li onClick={() => setMenu('contact-us')} className={`nav-item ${menu === 'contact-us'?'active':''}`}>Contact Us</li>
        </ul>
        <div className='navbar-right'>
            <div className='search-bar'>
                <input type='text' placeholder='Search...' className='search-input'/>
                <img src={assets.search_icon} alt='search' className='search-icon'/>
            </div>
            <div className='basket-icon' onClick={() => setMenu('')}>
                <Link to='/cart' className="cart-basket"><img src={assets.basket_icon} alt='basket' className='basket-icon-img'/></Link>
            </div>
            <div className='profile-icon' onClick={() => setMenu('')}>
                <Link to='/profile' className="profile-link"><img src={assets.profile_icon} alt='profile' className='profile-icon-img'/></Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
