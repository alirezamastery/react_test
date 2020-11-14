import logo from './logo.svg';
import './App.css';
import Slider from "./components/slider";
import RangeSlider from "./components/pricing";
import React from "react";

function App() {
    const text1 = "this is a test"
    const text2 = "not any more"

    return (
        <div className="App">
            <div className="container p-3 my-3 border">
                <Slider text={[text1, text2]}/>
            </div>
            <div className="container p-3 my-3 border">
                <RangeSlider/>
            </div>
        </div>
    );
}

export default App;
