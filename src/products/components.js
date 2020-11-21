import React, {useEffect, useState} from "react";
import {useFetch, loadProducts} from "../lookup/components";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import {Link} from 'react-router-dom'


function Product(props) {
    const className = props.className ? props.className : 'container'
    const productLink = `/products/${props.product.slug}`
    return (
        <div className={className}>
            {/*you can also use <a> tag but I think it reloads the page*/}
            <Link to={productLink}>
                <img className="img-thumbnail img-fluid" src={props.product.image} alt={props.product.name}/>
                <h3>{props.product.name}</h3>
            </Link>
            <p> قیمت: {props.product.price}</p>
        </div>
    )
}


function ProductsList(props) {
    const [products, setProducts] = useState([])
    console.log('in ProductsList: ', props.ordering)
    console.log('in ProductsList: ', products)

    const url = `/products/?${props.ordering}`

    //callback is needed to be in a function that we will call only when we need it so we won't go into infinite loop!?
    const callback = (response) => {
        setProducts(response)
    }

    useFetch(url, callback)

    return (
        <Grid container spacing={1} alignItems="flex-start">

            {products.results.map((item, index) => {
                return (
                    <Grid item key={item.id} xs={4} md={4}>
                        <Product product={item}
                                 className='container my-1 py-1 border text-dark'
                                 key={`${index}-{item.id}`}
                        />
                    </Grid>
                )
            })}

        </Grid>
    )
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