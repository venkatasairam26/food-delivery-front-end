import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './index.css'
import appUrl from '../../context/storeContext'
import CartItems from '../CartItems'

const apiStatusContext = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "PROGRESS",
  failure: "FAILURE"
}
const Cart = () => {
  const jwtToken = Cookies.get('jwt_token')

  const [cartItemsData, setCartItemsData] = useState({
    apiStatus: apiStatusContext.initial,
    data: [],
    errorMsg: null
  })
  

  useEffect(() => {
    setCartItemsData({
      apiStatus: apiStatusContext.inProgress,
      data: [],
      errorMsg: null
    })
    getCartItems()
  }, [])

  const getCartItems = async () => {

      const apiUrl = `${appUrl}/cart`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        setCartItemsData({
          apiStatus: apiStatusContext.success,
          data: data,
          errorMsg: null
        })
      } else {
        console.error('Failed to fetch cart items:', data.error)
      }
    }

  const onDeleteCartItem = async (cartId) => {
    setCartItemsData({
      ...cartItemsData,
      apiStatus: apiStatusContext.inProgress
    })
    const apiUrl = `${appUrl}/cart/${cartId}`
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    getCartItems()
    if (response.ok) {
      console.log('Item removed from cart successfully')
    } else {
      console.error('Failed to remove item from cart:')
    }
  }

  

  

  const { data: cartItems, apiStatus } = cartItemsData
 



  const renderContent = () => {
    switch (apiStatus) {
      case apiStatusContext.success:
        return (
          cartItems.length > 0 ? (<ul className='cart-items-list'>
            {cartItems.map(item => (
              <CartItems
                key={item.cartId}
                cartItems={item}
                onDeleteCartItem={onDeleteCartItem}
              />
            ))}
          </ul>): (
            <div className='empty-cart-view'>
              <h1 className='empty-cart-message'>Your cart is empty</h1>
            </div>
          )
        )
      case apiStatusContext.failure:
        return <div className='error-view'><h1 className='error-message'>Something went wrong. Please try again later.</h1></div>
      case apiStatusContext.inProgress:
        return <div className='loading-view'><h1 className='loading-message'>Loading...</h1></div>
      default:
        return null
    }
  }


  return (
    <div>
      <h1 className='cart-text'>Cart</h1>
      {renderContent()}
    </div>
  )
}

export default Cart
