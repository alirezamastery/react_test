import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuthDispatch, logout, useAuthState } from '../Context';
import axiosInstance from '../axios'


export default function UserStatus() {

    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();
    const [username, setUsername] = useState('');
    console.log("in UserStatus | userDetails: " , userDetails)
    // --------------------------------future update-------------------------------- refresh token expiration time check
    let has_token = false
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        const now = Math.ceil(Date.now() / 1000);
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        // console.log("in UserStatus | refreshToken: ", tokenParts.exp - now)
        if (tokenParts.exp > now)
            has_token = true
        else
            logout(dispatch)
    }
    // -----------------------------------------------------------------------------
    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axiosInstance.get(`user/detail/${userDetails.userID}/`)
                if (!didCancel) {
                    setUsername(result.data.username)
                }
            } catch (error) {
                if (!didCancel) {
                    if (error.message === 'refresh_token_expired') {
                        console.log("in UserStatus | we got the error")
                        logout(dispatch)
                        // window.location.reload()
                    } else {
                        console.log("in UserStatus | unexpected error: ", error)
                    }
                }
            }
        }

        if (has_token) fetchData();

        return () => {
            didCancel = true
        }

    }, [])

    // if (userDetails.userID) {
    //     axiosInstance  // make this logic a separate function & use it in shopping cart
    //         .get(`user/detail/${userDetails.userID}/`)
    //         .then((res) => {
    //             setUsername(res.data.username)
    //         })
    //         .catch(error => {
    //             if (error.message === 'refresh_token_expired') {
    //                 console.log("in UserStatus | we got the error")
    //                 logout(dispatch)
    //                 // window.location.reload()
    //             } else {
    //                 console.log("in UserStatus | unexpected error: ", error)
    //             }
    //         })
    // }

    if (userDetails.userID) {

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