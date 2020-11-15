import React, {useEffect, useState} from "react";
import loadTweets from "../lookup/components";


function Product(props) {
    const className = props.className ? props.className : 'container'
    return (
        <div className={className}>
            <img className="img-thumbnail img-fluid" src={props.product.image} alt={props.product.name}/>
            <h3>{props.product.name}</h3>
            <p> قیمت: {props.product.price}</p>
        </div>
    )
}

function ProductsList(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const myCallback = (response, status) => {
            console.log(response, status)
            if (status === 200) {
                setProducts(response)
            } else {
                alert("There was an error")
            }
        }
        loadTweets(myCallback)
    }, [])

    return products.map((item, index) => {
        return <Product product={item}
                        className='container my-1 py-1 border text-dark col-3'
                        key={`${index}-{item.id}`}/>
    })
}


export {Product, ProductsList}