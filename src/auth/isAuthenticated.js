import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useSelector, useDispatch } from 'react-redux'
import { useAuthDispatch, logout, useAuthState } from '../Context';


function IsAuthenticated() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const userDetails = useAuthState();

    let has_token = false
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        const now = Math.ceil(Date.now() / 1000);
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        if (tokenParts.exp > now)
            has_token = true
    }

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
                        console.log("in IsAuthenticated | we got the error")
                        logout(dispatch)
                    } else {
                        console.log("in IsAuthenticated | unexpected error: ", error)
                    }
                }
            }
        }

        if (has_token) fetchData();

        return () => {
            didCancel = true
        }
    }, [])

    // ---
    return has_token
}

export default IsAuthenticated
