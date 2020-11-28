import { Button } from '@material-ui/core'
import { link } from 'fs'
import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    {
        name: "اطلاعات حساب",
        url: "/users/profile/detail",
    },
    {
        name: "سفارش ها",
        url: "/users/orders"
    }
]

function Sections({ selectHandler }) {

    return (
        <div>
            {sections.map((item, index) => {
                return (
                    <button
                        className="btn btn-dark btn-lg btn-block rounded-0"
                        onClick={selectHandler}
                        id={index}
                        key={index}
                    >
                        {item.name}
                    </button>
                )
            })}
        </div>
    )
}

export default Sections
