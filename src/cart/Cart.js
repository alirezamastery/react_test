import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../reducers/actions'
import Payment from './payment'
import Items from './cartItems'
import { logout } from '../Context'


function Cart() {
    const cart = useSelector(state => state.cart)
    const [hasItem, setHasItem] = useState(false)
    const itemsPrice = Object.keys(cart.cartData).map(key => cart.cartData[key])

    useEffect(() => {
        if (itemsPrice.length > 0)
            setHasItem(true)
        else
            setHasItem(false)
    }, [itemsPrice])


    if (!hasItem) {
        return (
            <div className="container border text-center mt-5" style={{ height: "500px" }}>
                <h6>کالایی در سبد خرید شما وجود ندارد!</h6>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9">
                    <Items />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <Payment />
                </div>
            </div>
        </div>
    )
}

export default Cart
