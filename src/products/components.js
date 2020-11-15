import React, {useEffect, useState} from "react";
import loadTweets from "../lookup/components";


function Product(props) {
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    return (
        <div className={className}>
            <p>{props.product.name}</p>
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
                        className='my-5 py-5 border bg-white text-dark'
                        key={`${index}-{item.id}`}/>
    })
}


export {Product, ProductsList}