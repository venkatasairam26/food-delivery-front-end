import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../header'
// import ExploreMenu from '../exploreMenu'
import PrductItem from '../ProductItems'
import appUrl from '../../context/storeContext'

const apiStatusContext = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "PROGRESS",
  failure: "FAILURE"

}
const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    apiStatus: apiStatusContext.initial, data: null, errorMsg: null

  })

  const renderSuccessView = () => {
    return (
      <ul className='product-list'>
        {apiResponse.data.map((product) => <PrductItem key={product.productId} productDetails={product} />)}
      </ul>
    )
  }

  const renderFailureView = () => {
    return (
      <div className='error-view'>
        <h1 className='error-message'>Something went wrong. Please try again later.</h1>
      </div>
    )
  }



  const renderLoadingView = () => {
    return (
      <div className='loading-view'>
        <h1 className='loading-message'>Loading...</h1>
      </div>
    )
  }

  const renderContent = () => {
    const { apiStatus } = apiResponse
    switch (apiStatus) {
      case apiStatusContext.success:
        return renderSuccessView()
      case apiStatusContext.failure:
        return renderFailureView()
      case apiStatusContext.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  useEffect(() => {
    setApiResponse(prevState => ({ ...prevState, apiStatus: apiStatusContext.inProgress }))
    const getProductItems = async () => {
      const url = appUrl;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: `Bearer ${Cookies.get('jwt_token')}`,
        }
      })
      const data = await response.json()
      if (response.ok) {
        setApiResponse({
          apiStatus: apiStatusContext.success,
          data: data,
          errorMsg: null
        })
      } else {
        setApiResponse({
          apiStatus: apiStatusContext.failure,
          data: null,
          errorMsg: data.error
        })
      }
    }
    getProductItems()
  }, [])

 

  return (
    <div className='home-page'>
      <Header />
      <h1 className='product-text'>Products</h1>
      {renderContent()}
    </div>
  )
}

export default Home
