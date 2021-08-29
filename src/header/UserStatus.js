import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../axios';
import { logout } from '../auth/AuthActions'
import useIsAuthenticated from '../auth/IsAuthenticated';


export default function UserStatus() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [athenticated, username, loading] = useIsAuthenticated()

    // console.log("in UserStatusTEST | userDetails: ", auth, athenticated, username, loading)
    // console.log("in UserStatusTEST | athenticated, username, loading: ", athenticated, username, loading)

    if (athenticated) {
        return (
            <>
                <p className="m-auto" style={{ color: "#ffffff" }}>{` ${username} خوش امدید `}</p>
                <nav>
                    <Link to="/user/profile" >
                        <button className="btn btn-secondary rounded-0 shadow-none ml-1 mr-1"
                            onMouseUp={(e) => e.target.blur()}
                        >حساب کاربری</button>
                    </Link>
                    <Link to="/logout" >
                        <button className="btn btn-outline-danger rounded-0 ml-1 mr-1">خروج</button>
                    </Link>
                </nav>
            </>
        )
    }
    else {
        return (
            <nav>
                <Link to="/login" >
                    <button className="btn btn-outline-info rounded-0 shadow-none ml-1 mr-1">وارد شوید</button>
                </Link>
                <Link to="/register" >
                    <button className="btn btn-info rounded-0 shadow-none ml-1 mr-1">ثبت نام</button>
                </Link>
            </nav>
        )
    }
}