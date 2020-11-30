import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const sections = [
    {
        name: "اطلاعات حساب",
        url: "/users/profile/detail",
        selected: true
    },
    {
        name: "سفارش ها",
        url: "/users/orders",
        selected: false
    },
    {
        name: "تیکت",
        url: "/users/orders",
        selected: false
    }
]

function Sections({ selectHandler }) {
    const [sectionButtons, setSectionButtons] = useState(sections)

    const handleClick = (e) => {
        const buttonID = parseInt(e.target.id)
        let sectionButtonsCopy = [...sectionButtons]
        for (let i = 0; i < sectionButtons.length; i++) {
            if (i === buttonID)
                sectionButtonsCopy[i].selected = true
            else
                sectionButtonsCopy[i].selected = false
        }
        setSectionButtons(sectionButtonsCopy)

        selectHandler(e) // after all we needed to do here do what has benn passed from parent component
    }

    return (
        <div>
            {sections.map((item, index) => {
                return (
                    <button
                        className={item.selected ?
                            "btn btn-primary btn-lg btn-block rounded-0 shadow-none active" :
                            "btn btn-dark btn-lg btn-block rounded-0 shadow-none"}
                        onClick={handleClick}
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
