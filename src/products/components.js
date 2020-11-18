import React, {useEffect, useState} from "react";
import {useFetch, loadProducts} from "../lookup/components";


function Product(props) {
    const className = props.className ? props.className : 'container'
    const productLink = `http://127.0.0.1:8000/api/products/${props.product.id}`
    return (
        <div className={className}>
            <a href={productLink}>
                <img className="img-thumbnail img-fluid" src={props.product.image} alt={props.product.name}/>
            </a>
            <a href={productLink}>
                <h3>{props.product.name}</h3>
            </a>
            <p> قیمت: {props.product.price}</p>
        </div>
    )
}


function ProductsList(props) {
    const [products, setProducts] = useState([])
    console.log(props.ordering)

    const url = `http://127.0.0.1:8000/api/products/?${props.ordering}`

    //callback is needed to be in a function that we will call when we need it so we won't go into infinite loop!?
    const callback = (response) => {
        setProducts(response)
    }

    useFetch(url, callback)

    return products.map((item, index) => {
        return <div>
            <Product product={item}
                     className='container my-1 py-1 border text-dark col-3'
                     key={`${index}-{item.id}`}/>
        </div>
    })
}

function ProductDetail() {
    const [product, setProduct] = useState(null)


}

export {Product, ProductsList, ProductDetail}


// *** cfe example to fetch data from an api which works: ***
// useEffect(() => {
//     const myCallback = (response, status) => {
//         console.log(response, status)
//         if (status === 200) {
//             setProducts(response)
//         } else {
//             alert("There was an error")
//         }
//     }
//     loadProducts(myCallback)
// }, [])