import React from 'react';
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../reducers/actionTypes'


function HeaderLower() {
    const cart = useSelector(state => state.cart)
    console.log('in header lowe | cart:', cart)

    const dispatch = useDispatch()
    const itemsNum = Object.keys(cart.cartData).length

    return (
        <nav className="navbar navbar-expand-lg navbar-light  justify-content-between border-top border-light shadow" style={{ backgroundColor: "#e6e6e6" }}>
            <div className="container">

                <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarLower" aria-controls="navbarLower" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="navbarLower">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                محصولات
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="/">الکترونیک</a>
                                <a className="dropdown-item" href="/">مکانیک</a>
                                <a className="dropdown-item" href="/">مواد</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">خانه <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">سوالات متداول</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">تخفیفات</a>
                        </li>
                    </ul>
                </div>
                <Link to="/user/cart">
                    <button className="btn btn-link">سبد خرید({itemsNum})</button>
                </Link>
                <button className="btn btn-warning" onClick={() => dispatch({ type: cartActions.CLEAR_CART })}>حذف سبد</button>

            </div>
        </nav>
    );
}

export default HeaderLower;
