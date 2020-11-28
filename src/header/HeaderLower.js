import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import UserStatus from './UserStatus';
import { useAuthState } from '../Context';



function HeaderLower() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light  justify-content-between border-top border-light" style={{backgroundColor:"#e6e6e6"}}>
            <div className="container">

                <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navbarLower" aria-controls="navbarLower" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ml-auto" id="navbarLower">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                محصولات
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="/">الکترونیک</a>
                                <a className="dropdown-item" href="/">مکانیک</a>
                                <a className="dropdown-item" href="/">مواد</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">خانه <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">سوالات متداول</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">تخفیفات</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default HeaderLower;
