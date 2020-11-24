import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Pagination({ totalPages , OnPageSelect}) {

    const paginationObjects = []

    // Finding current page number:
    let currentPageNum = 1;
    const urlSearch = window.location.search
    const currentPageString = urlSearch.match(/page=[0-9]/)
    if (currentPageString) {
        let currentPageNumString = currentPageString[0].match(/[0-9]/)
        currentPageNum = parseInt(currentPageNumString[0])
    }
    console.log('currentPageNum: ', currentPageNum)


    if (1 < totalPages) {
        for (let i = currentPageNum - 1; i > 0 && i > (currentPageNum - 5); i--) {
            const objURL = `&page=${i}`
            const obj = {
                number: i,
                link: objURL,
                selected: false
            }
            paginationObjects.unshift(obj)
        }
        for (let i = currentPageNum; i <= totalPages && i < (currentPageNum + 4); i++) {
            const objURL = `&page=${i}`
            const obj = {
                number: i,
                link: objURL,
                selected: i === currentPageNum ? true : false
            }
            paginationObjects.push(obj)
        }
    }

    console.log("paginationObjects: ", paginationObjects)

    const handlePaginationClick = (event) => {
        OnPageSelect(event.target.id)
    }

    return (
        <nav>
            <ul className="pagination">
                {paginationObjects.map(item => (
                    <li key={item.number} className="page-item" >
                        <button 
                        type="button"
                        id={item.number} 
                        onClick={handlePaginationClick}
                        className={item.selected ? "btn btn-info m-2" : "btn btn-light m-2"}>
                            {item.number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
