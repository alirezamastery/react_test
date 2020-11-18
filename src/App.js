import './App.css';
import React, {useState} from 'react';
import {ProductsList} from "./products/components";

function ButtonForm(props) {
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
    const [buttonsState, setbuttonsState] = useState(initState)

    const handleClick = (button) => {
        const x = parseInt(button.target.id)
        console.log(x)
        let buttonsStateCopy = [...buttonsState]
        let i = 0
        for (i; i < buttonsState.length; i++) {
            console.log('i: ', i)
            if (i === x) {
                console.log('here')
                buttonsStateCopy[i].classname = "btn btn-primary m-2 shadow-none"
            } else {
                buttonsStateCopy[i].classname = "btn btn-outline-primary m-2 shadow-none"
            }
        }
        console.log('items: ', buttonsStateCopy)
        console.log('buttonsState: ', buttonsState)
        setbuttonsState(buttonsStateCopy)
        props.OrderingCallback(buttonsState[x].ordering)
    }

    return buttonsState.map((item, index) => {
        return <button className={item.classname}
                       onClick={handleClick}
                       id={item.id}
                       key={`${index}`}>{item.text}</button>
    })
}

function App() {
    const [ordering, setOrdering] = useState('')

    return (
        <div className="App">
            <h2>محصولات</h2>
            <ButtonForm OrderingCallback={setOrdering}/>
            <ProductsList ordering={ordering}/>
        </div>
    );
}

export default App;
