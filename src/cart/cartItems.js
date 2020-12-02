import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../reducers/actions'

function Items() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleDeleteItem = (e) => {
        const buttonId = parseInt(e.target.id)
        const obj = {}
        obj[buttonId] = { ...cart.cartData[buttonId] }
        dispatch({ type: cartActions.REMOVE_ITEM, payload: obj })
    }

    const handleItemIncrement = (e) => {
        let fieldValue = parseInt(document.getElementById(e.target.id + "Quantity").value);
        fieldValue += 1
        document.getElementById(e.target.id + "Quantity").value = fieldValue;
    }
    const handleItemDecrement = (e) => {
        let fieldValue = parseInt(document.getElementById(e.target.id + "Quantity").value);
        fieldValue -= 1
        document.getElementById(e.target.id + "Quantity").value = fieldValue;
    }
    const handleItemChange = (e) => {
        const buttonId = parseInt(e.target.id)
        const fieldValue = parseInt(document.getElementById(e.target.id + "Quantity").value);
        const obj = {}
        obj[buttonId] = { ...cart.cartData[buttonId], quantity: fieldValue }
        dispatch({ type: cartActions.EDIT_ITEM, payload: obj })
    }
    return (
        <div className="container p-2 border shadow mt-5">
            {Object.keys(cart.cartData).map((item, index) => {
                return (
                    <div key={index}>
                        <div className="row m-2" >
                            <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 ml-auto">
                                <Link to={`/products/${cart.cartData[item].slug}`}>
                                    <img
                                        className="img-fluid p-2"
                                        style={{ width: "150px", height: "150px" }}
                                        src={cart.cartData[item].image}
                                    />
                                </Link>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-9 col-xl-9 p-3">
                                <Link to={`/products/${cart.cartData[item].slug}`}>
                                    <h4>{cart.cartData[item].name}</h4>
                                </Link>
                                <p>قیمت: {cart.cartData[item].price}</p>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="d-inline">تعداد: {cart.cartData[item].quantity}</h5>
                                        <button id={item} className="btn btn-outline-secondary btn-sm" onClick={handleItemIncrement}>+</button>
                                        <input id={`${item}Quantity`} className="form-group text-center" type="number"
                                            style={{ width: "50px" }}
                                            defaultValue={cart.cartData[item].quantity} />
                                        <button id={item} className="btn btn-outline-secondary btn-sm" onClick={handleItemDecrement}>-</button>
                                        <button id={item} className="btn btn-light mr-4" onClick={handleItemChange}>بروزرسانی</button>
                                    </div>
                                    <div>
                                        <button id={item} className="btn btn-light" onClick={handleDeleteItem}>حذف</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {index < Object.keys(cart.cartData).length - 1 ? <hr className="m-4" /> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default Items
