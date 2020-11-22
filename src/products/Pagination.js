import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination({ totalPages, ordering, currentPage }) {
    const pageNumbers = []
    const linkBase = `/products/?`

    if (totalPages) {
        for (let i = 1; i <= totalPages; i++) {
            const objURL = linkBase + ordering + `&page=${i}`
            const obj = {
                number: i,
                link: objURL
            }
            pageNumbers.push(obj)
        }
    }
    console.log('in pagination', pageNumbers)
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(item => (
                    <li key={item.number} className="page-item">
                        <Link to={item.link} className="page-link">
                            {item.number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
