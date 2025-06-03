import { Component, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import './index.css'
import Header from '../header'
import ExploreMenu from '../exploreMenu'

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

  useEffect(()=>{
   const getProductItems = async () => {
      const url = 'https://food-delivery-backend-rv87.onrender.com/'
          const response = await fetch(url,{
            method: "GET",
            headers: {
                authorization: `Bearer ${Cookies.get('jwt_token')}`,
            }
          })
          const data = await response.json()
          console.log("Data:", data)
  }
  getProductItems()
  },[])

  
  return (
    <div className='home-page'>
        <h1>Home Page</h1>
    </div>
  )
}

export default Home
