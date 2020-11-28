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
    // console.log('ProductsMainView first: ', data)
    // console.log('ProductsMainView first: ', orderBy, filterBy, pageNum, searchData)

    useEffect(() => {
        setIsLoading(true)
        axiosInstance.get("products/" + window.location.search).then((res) => {
            setData(res.data);
        })
        setIsLoading(false)

    }, [searchData]);


    useEffect(() => {
        let search = ''
        if (orderBy !== '') {
            search = search + orderBy
        }
        if (filterBy !== '') {
            search = search + "&search=" + filterBy
        }

        if (search !== '') {
            history.push({
                pathname: '/',
                search: '?' + search
            });
            setSearchData('?' + search)
            setPageNum('')
        }

    }, [orderBy, filterBy])

    useEffect(() => {
        if (pageNum !== '') {
            let search = window.location.search
            const currentPageString = search.match(/page=[0-9]/)
            // console.log('in pageNum useEffect: ', search, currentPageString)

            if (currentPageString) {
                search = search.replace(currentPageString[0], `page=${pageNum}`)
            }
            else {
                search = search + "&page=" + pageNum
            }

            history.push({
                pathname: '/',
                search: search
            });
            setSearchData(search)
        }

    }, [pageNum])

    // console.log('ProductsMainView second')

    const handleOrderingChange = (OrderingChoice) => setOrderBy(OrderingChoice)  //this single line is a function definition!
    const handleFilterChange = (newData) => setFilterBy(newData)
    const handlePaginationChange = (newData) => setPageNum(newData)

    let products = data.results ? data.results : []
    let totalPages = data.total_pages ? data.total_pages : 0

    return (
        <div className="container justify-content-center mt-5">
            <div className="row">
                <div className="col-sm-3 col-md-3 col-xs-6">
                    <Filter onSelectFilter={handleFilterChange} />
                </div>
                <div className="col-sm-9 col-md-9 col-xs-6">
                    <OrderingButtons onSelectOrderBy={handleOrderingChange} />
                    <ProductGrid isLoading={isLoading} products={products} />
                    <Pagination totalPages={totalPages} OnPageSelect={handlePaginationChange} />
                </div>
            </div>
        </div>
    )
}

export default ProductsMainView
