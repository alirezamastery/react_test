import React, {useState} from "react";

// pass the ordering state setter to this function as "onSelectOrderBy"
export function OrderingButtons({onSelectOrderBy}) {
    const initState = [
        {
            id: 0,
            classname: "btn btn-primary m-2",
            name: "date_desc",
            ordering: "ordering=-created_date",
            text: "جدیدترین"
        },
        {
            id: 1,
            classname: "btn btn-outline-primary m-2",
            name: "date_asc",
            ordering: "ordering=created_date",
            text: "قدیمی ترین"
        },
        {
            id: 2,
            classname: "btn btn-outline-primary m-2",
            name: "price_desc",
            ordering: "ordering=-price",
            text: "گران ترین"
        },
        {
            id: 3,
            classname: "btn btn-outline-primary m-2",
            name: "price_asc",
            ordering: "ordering=price",
            text: "ارزان ترین"
        }
    ]
    const [buttonsState, setButtonsState] = useState(initState)

    const handleClick = (button) => {
        const x = parseInt(button.target.id)
        let buttonsStateCopy = [...buttonsState]
        // Change the className of the button we have selected to blue. set other buttons to not selected state:
        let i = 0
        for (i; i < buttonsState.length; i++) {
            if (i === x) {
                buttonsStateCopy[i].classname = "btn btn-primary btn-sm m-2 shadow-none"
            } else {
                buttonsStateCopy[i].classname = "btn btn-outline-primary btn-sm m-2 shadow-none"
            }
        }
        // console.log('in OrderingButtons: ' , buttonsState[x].ordering)
        setButtonsState(buttonsStateCopy)
        onSelectOrderBy(buttonsState[x].ordering)
    }

    return buttonsState.map((item, index) => {
        return <button className={item.classname}
                       onClick={handleClick}
                       id={item.id}
                       key={`${index}`}>{item.text}</button>
    })
}

export default OrderingButtons