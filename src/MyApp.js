import React, {useEffect, useState} from 'react';
import './App.css';
import {ProductsList} from './products/components'
// import OrderingButtons from "./components/buttons"

function MyApp() {
    const [ordering, setOrdering] = useState("ordering=-created_date")



    return (
        <div className="container">
            <h1>آخرین محصولات</h1>

            <div className="justify-content-center">
                <ProductsList/>
            </div>
        </div>
    );
}

export default MyApp;