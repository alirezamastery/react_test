import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import ProductGrid from './ProductsGrid'
import Pagination from './Pagination'
import Filter from './search/Filter'
import OrderingButtons from '../components/buttons'
import axiosInstance from '../axios';

function ProductsMainView() {

    let history = useHistory()

    const [data, setData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [orderBy, setOrderBy] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [searchData, setSearchData] = useState('')

    console.log('in ProductsMainView: ', window.location.search)
    console.log('in ProductsMainView: ', window.location.pathname)
    useEffect(() => {
        console.log('in ProductsMainView | useEffect window.location: ', window.location)
        setIsLoading(true)
        axiosInstance.get("products/" + window.location.search).then((res) => {
            setData(res.data);
            setIsLoading(false)
        });
    }, [searchData]);

    useEffect(() => {
        let search = ''
        if (orderBy !== '') {
            search = search + orderBy
        }
        if (filterBy !== '') {
            search = search + "&search=" + filterBy
        }
        history.push({
            pathname: '/',
            search: '?' + search
        });
        setSearchData('?' + search)
        // window.location.reload();
    }, [orderBy, filterBy])


    const handleOrderingChange = (OrderingChoice) => setOrderBy(OrderingChoice)  //this single line is a function definition!
    const handleFilterChange = (newData) => setFilterBy(newData)

    let products = data.results ? data.results : []
    let nextPage = data.next ? data.next : null
    let prevPage = data.previous ? data.previous : null
    let productCount = data.count ? data.count : 0

    return (
        <div className="container justify-content-center">
            <OrderingButtons onSelectOrderBy={handleOrderingChange} />
            <Filter onSelectFilter={handleFilterChange} />
            <ProductGrid isLoading={isLoading} products={products} />
            {/* <Pagination /> */}
        </div>
    )
}

export default ProductsMainView
