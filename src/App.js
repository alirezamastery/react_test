import './App.css';
import React, {useEffect, useState} from 'react';
import {Toggle} from "./components/toggle";
import {ProductsList} from "./products/components";




function App() {


    return (
        <div className="App">
            <p>some text</p>
            <ProductsList />
            <Toggle/>
        </div>
    );
}

export default App;
