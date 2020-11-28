import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

export default function Pagination({ totalPages, OnPageSelect }) {

    const paginationObjects = []

    // Finding current page number:
    let currentPageNum = 1;
    const urlSearch = window.location.search
    const currentPageString = urlSearch.match(/page=[0-9]/)
    if (currentPageString) {
        let currentPageNumString = currentPageString[0].match(/[0-9]/)
        currentPageNum = parseInt(currentPageNumString[0])
    }

    if (1 < totalPages) {

        for (let i = currentPageNum - 1; i > 0 && i > (currentPageNum - 5); i--) {
            const obj = {
                number: i,
                text: `${i}`,
                link:  `&page=${i}`,
                selected: false
            }
            paginationObjects.unshift(obj)
        }
        if (currentPageNum > 1) {
            const obj = {
                number: 0,
                text: "<<",
                link: `&page=1`,
                selected: false
            }
            paginationObjects.unshift(obj)
        }
        for (let i = currentPageNum; i <= totalPages && i < (currentPageNum + 4); i++) {
            const obj = {
                number: i,
                text: `${i}`,
                link: `&page=${i}`,
                selected: i === currentPageNum ? true : false
            }
            paginationObjects.push(obj)
        }
        if (totalPages > 5 && currentPageNum < totalPages) {
            const obj = {
                number: totalPages + 1,
                text: ">>",
                link: `&page=${totalPages}`,
                selected: false
            }
            paginationObjects.push(obj)
        }
    }

    const handlePaginationClick = (event) => {
        const buttonID = parseInt(event.target.id)
        let num;
        switch (buttonID) {
            case 0:
                num = 1
                break;
            case totalPages + 1:
                num = totalPages
                break;
            default:
                num = buttonID
                break;
        }
        OnPageSelect(num)
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
                            className={item.selected ? "btn btn-info shadow-none m-2" : "btn btn-light m-2"}>
                            {item.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
