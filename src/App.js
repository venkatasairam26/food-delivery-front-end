import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
// import Products from './components/Products'
// import AboutUs from './components/AboutUs'
// import ContactUs from './components/ContactUs'
import Cart from './components/cart'
import PlaceOrder from './components/placeOrder'
import Login from './login/index'
import ProtuctedRoute from './protuctedRoute'
import Register from './Register'
import Profile from './components/Profile'


const App = () => {
  return (
    <div className='app'>
      <div className='container'>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtuctedRoute exact path='/' component={Home } />
        <ProtuctedRoute exact path='/cart' component={Cart} />
        <ProtuctedRoute exact path='/profile' component = {Profile} />
        <Route exact path='/place-order' component={PlaceOrder } />
      </Switch> 
    </div>
    </div>
  )
}

export default App
