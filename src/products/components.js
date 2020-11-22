import React, {useEffect, useState} from "react";
import {useFetch, loadProducts} from "../lookup/components";
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import {Link} from 'react-router-dom'
import OrderingButtons from "../components/buttons";
import axios from 'axios';


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

function ProductGrid({isLoading , products}) {
    if (isLoading) return "Loading..."
    return (
        <Grid container spacing={1} alignItems="flex-start">
            {products.map((item, index) => {
                return (
                    <Grid item key={item.id} xs={4} md={4}>
                        <Product product={item}
                                 className='container my-1 py-1 border text-dark'
                                 key={item.id}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}

function ProductsList(props) {
    const [products, setProducts] = useState([])
    const [ordering, setOrdering] = useState("ordering=-created_date")

    const [currentPage, setCurrentPage] = useState("http://127.0.0.1:8000/api/products/")
    const [nextPage, setNextPage] = useState()
    const [prevPage, setPrevPage] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let cancel
        axios.get(currentPage, {
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(response => {
            console.log('in axios:', response.data)
            setLoading(false)
            setProducts(response.data.results.map(item => item))
            setNextPage(response.data.next)
            setPrevPage(response.data.previous)
        }).catch(e => console.log('error:', e))

        return () => cancel()  //clean up

    }, [currentPage])

    //setState is needed to be in a function that we will call only when we need it, so we won't go into infinite loop!?
    const callbackOrdering = (response) => {
        setOrdering(response)
    }
    useEffect(() => {
        console.log('in useEffect:', ordering)
        const url = `http://127.0.0.1:8000/api/products/?${ordering}`
        setCurrentPage(url)
    }, [ordering])

    // const callbackProducts = (response) => {
    //     setProducts(response)
    // }
    //
    // useFetch(url, callbackProducts)
    // if (loading) return "Loading..."
    return (
        <div>
            <OrderingButtons OrderingCallback={callbackOrdering}/>
            <ProductGrid products={products} isLoading={loading}/>
        </div>
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