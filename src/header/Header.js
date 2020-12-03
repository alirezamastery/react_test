import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import UserStatus from './UserStatus';
import { useAuthState } from '../Context';



function Header() {
    // console.log("HEADER")

    // let history = useHistory();
    // const [data, setData] = useState({ search: '' });
    // const goSearch = (e) => {
    //     console.log('data.search', data.search)
    //     history.push({
    //         pathname: '/olagh/search/',
    //         search: '?search=' + data.search
    //     });
    //     window.location.reload();
    // };



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    <img src="http://127.0.0.1:8000/media/Crown.png"
                        className="float-right" width="50" height="40" alt="" />
                </Link>

                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="جست و جو..." aria-label="Search" />
                </form>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto">
                        {UserStatus()}
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Header;
