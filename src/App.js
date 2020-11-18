import './App.css';
import React, {useState} from 'react';
import {ProductsList} from "./products/components";
import {BrowserRouter as Router} from 'react-router-dom'
import BaseRouter from "./routes";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import CustomLayout from "./containers/Layout";
import ArticleList from "./containers/ArticleListView";

function App() {

    return (
        <div className="App">
            <Router>
                <CustomLayout>
                    <ArticleList/>
                </CustomLayout>
            </Router>
        </div>
    );
}

export default App;
