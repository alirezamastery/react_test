import React from "react";
import {Router} from 'react-router-dom'

import ArticleList from "./containers/ArticleListView";
import ArticleDetail from "./containers/ArticleDetailView";

export const BaseRouter = () => {
    return (<div>
            <Router exact path='/' component={ArticleList} />
            <Router exact path='/:articleID' component={ArticleDetail} />
        </div>
    )
}


export default BaseRouter