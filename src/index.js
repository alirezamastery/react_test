import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';

const routing = (
    <Router>
        <React.StrictMode>
            <Header/>
            <Switch>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
            </Switch>
            <Footer/>
        </React.StrictMode>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


// ReactDOM.render(
//     <React.StrictMode>
//         <App/>
//     </React.StrictMode>,
//     document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
