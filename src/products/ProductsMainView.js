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
    const [pageNum, setPageNum] = useState('')
    const [searchData, setSearchData] = useState('')

    // console.log('in ProductsMainView | window.location.search:', window.location.search)
    // console.log('in ProductsMainView | window.location.pathname: ', window.location.pathname)
    console.log('ProductsMainView first: ', data)
    console.log('ProductsMainView first: ', orderBy, filterBy, pageNum, searchData)

    useEffect(() => {
        console.log('first useEffect')
        setIsLoading(true)
        axiosInstance.get("products/" + window.location.search).then((res) => {
            setData(res.data);
        });
        setIsLoading(false)

    }, [searchData]);


    useEffect(() => {
        console.log('second useEffect')

        let search = ''
        if (orderBy !== '') {
            search = search + orderBy
        }
        if (filterBy !== '') {
            search = search + "&search=" + filterBy
        }
        if (pageNum !== '') {
            search = search + "&page=" + pageNum
        }
        history.push({
            pathname: '/',
            search: '?' + search
        });
        if (search !== '') {
            setSearchData('?' + search)
        }
        // window.location.reload();
    }, [orderBy, filterBy, pageNum]) // TODO changing ordering or filter should clear other items in window.location.search and give a fresh start

    console.log('ProductsMainView second')

    const handleOrderingChange = (OrderingChoice) => setOrderBy(OrderingChoice)  //this single line is a function definition!
    const handleFilterChange = (newData) => setFilterBy(newData)
    const handlePaginationChange = (newData) => setPageNum(newData)

    let products = data.results ? data.results : []
    let totalPages = data.total_pages ? data.total_pages : 0
    let prevPage = data.previous ? data.previous : null
    let productCount = data.count ? data.count : 0

    return (
        <div className="container justify-content-center">
            <OrderingButtons onSelectOrderBy={handleOrderingChange} />
            <Filter onSelectFilter={handleFilterChange} />
            <ProductGrid isLoading={isLoading} products={products} />
            <Pagination totalPages={totalPages} OnPageSelect={handlePaginationChange} />
        </div>
    )
}

export default ProductsMainView
