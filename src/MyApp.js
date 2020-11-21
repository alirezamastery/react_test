import React, {useEffect, useState} from 'react';
import './App.css';
import {ProductsList} from './products/components'
import OrderingButtons from "./components/buttons"

function MyApp() {
    const [ordering, setOrdering] = useState("ordering=-created_date")

    const callback = (response) => {
        setOrdering(response)
    }

    return (
        <div className="container">
            <h1>آخرین محصولات</h1>
            <OrderingButtons OrderingCallback={callback}/>
            <div className="justify-content-center">
                <ProductsList ordering={ordering}/>
            </div>
        </div>
    );
}

export default MyApp;