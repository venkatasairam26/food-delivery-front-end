import Cookies from 'js-cookie'

import appUrl from '../../context/storeContext'
import './index.css'


const PrductItem = (props) => {
    const { productDetails } = props
    const { productId, imgUrl, name, category, price } = productDetails

    const onAddItemCart = async () => {
        const url = `${appUrl}/cart`
        const jwtToken = Cookies.get('jwt_token')
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                productId,
                quantity: 1, 
            }),
        }
        const response = await fetch(url, options)
        if (response.ok) {
            console.log('Item added to cart:')
        } else {
            const errorData = await response.json()
            console.error('Failed to add item to cart:', errorData.error)
        }
    }

    return (
        <li className="product-item" key={productId}>
            <img src={imgUrl} alt={name} className="product-image" />
            <div>
                <h2 className="product-name">{name}</h2>
                <p className="product-category">{category}</p>
                <p className="product-price">₹{price}</p>
                <button className="add-to-cart-button" onClick={onAddItemCart}>Add to Cart</button>
            </div>
        </li>
    )
}

export default PrductItem