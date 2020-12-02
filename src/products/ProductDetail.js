import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import { useSelector, useDispatch } from 'react-redux'
import { cartActions } from '../reducers/actions'

function ProductDetail(props) {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const { slug } = useParams()
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [itemAdded, setItemAdded] = useState(false)

    console.log('in ProductDetail', data)

    const url = `products/${slug}`
    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get(url).then((res) => {
            setData(res.data);
        });
        setIsLoading(false)
    }, [setData]);

    const handleAddToCart = () => {
        const quantity = parseInt(document.getElementById("orderQuantity").value)
        console.log("quantity: " , typeof quantity)
        // add the product with its quantity to global store (redux)
        const productObj = {
            id: data.id,
            name: data.name,
            price: data.price,
            quantity: quantity,
            image: data.image,
            slug: data.slug
        }
        const obj = {}
        obj[data.id] = productObj
        dispatch({ type: cartActions.ADD_ITEM, payload: obj })
        setItemAdded(true)
    }


    console.log("cart: ", cart)
    if (isLoading) {
        return <h3>در حال بارگزاری...</h3>
    }
    else {
        return (
            <div className="container mt-5">
                {itemAdded ?
                    (<div className="alert alert-success m-2" role="alert">
                        کالای مورد نظر به سبد خرید اضافه شد
                    </div>) : null}
                <div className="container border mt-2 text-right">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-5 image-container border-left text-center p-2">
                            <img src={data.image}
                                alt={`image of ${data.name}`} />
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-7 p-4">
                            <h2>{data.name}</h2>
                            <h3>قیمت : {data.price}</h3>
                            <div className="float-left">
                                <div>
                                    <button onClick={handleAddToCart} className="btn btn-success btn-lg shadow-none m-1">
                                        افزودن به سبد خرید
                                </button>
                                </div>
                                <div>
                                    <input type="number" id="orderQuantity" defaultValue="1" className="form-group m-1" min="1" style={{ width: "70px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h5>توضیحات محصول:</h5>
                    <p>{data.description}</p>
                </div>
            </div>
        )
    }

}

export default ProductDetail
