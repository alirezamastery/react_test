import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


function Payment() {
    const cart = useSelector(state => state.cart)
    const [totalAmount, setTotalAmount] = useState(0)
    const itemsPrice = Object.keys(cart.cartData).map(key => cart.cartData[key])

    useEffect(() => {
        let sum = 0
        for (let i = 0; i < itemsPrice.length; i++) {
            sum = sum + parseInt(itemsPrice[i].price) * parseInt(itemsPrice[i].quantity)
        }
        setTotalAmount(sum)
    }, [cart])


    return (
        <div className="container border shadow mt-5 pr-1 p-3">
            <div className="d-flex justify-content-between font-weight-light mt-1">
                <p>قیمت کالاها</p>
                <p>{totalAmount}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between font-weight-bold">
                <p>جمع کل</p>
                <p>{totalAmount}</p>
            </div>
            <hr />
            <Link to='/user/cart/payment-final'>
                <button
                    className="btn btn-success btn-lg btn-block"
                >
                    ادامه فرایند خرید
            </button>
            </Link>
        </div >
    )
}

export default Payment
