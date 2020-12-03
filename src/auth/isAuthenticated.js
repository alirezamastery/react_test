import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../auth/AuthActions'


export function useIsAuthenticated(user_id) {

    // const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        let didCancel = false;
        console.log("in IsAuthenticated | useEffect | ")

        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await axiosInstance.get(`user/detail/${user_id}/`)
                if (!didCancel) {
                    setAuthenticated(true)
                    setUsername(result.data.username)
                }
            } catch (error) {
                if (!didCancel) {
                    setAuthenticated(false)
                    setUsername('')
                    if (error.message === 'refresh_token_expired') {
                        console.log("in IsAuthenticated | we got the error")
                    } else {
                        console.log("in IsAuthenticated | unexpected error: ", error)
                    }
                }
            }
            setLoading(false)
        }

        if (Boolean(user_id))
            fetchData();
        else {
            setAuthenticated(false)
            setUsername('')
        }

        return () => {
            didCancel = true
        }
    }, [user_id])

    console.log("in IsAuthenticated | authenticated: ", authenticated)

    // ---
    return [authenticated, username, loading]
}

export default useIsAuthenticated




    // let isTokenValid = false
    // let user_id = ''
    // const refreshToken = localStorage.getItem('refresh_token');
    // if (refreshToken) {
    //     const now = Math.ceil(Date.now() / 1000);
    //     const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    //     if (tokenParts.exp > now) {
    //         isTokenValid = true
    //         user_id = tokenParts.user_id
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername('')
    //         logout(dispatch)
    //     }
    // }