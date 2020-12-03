import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import IsAuthenticated from '../auth/isAuthenticated';
import axiosInstance from '../axios'
import { useAuthDispatch, logout, useAuthState } from '../Context';



export default function FinalCheck() {
    const history = useHistory();
    const token = IsAuthenticated()
    console.log("in FinalCheck : ", token)
    if (!token)
        history.push('/login')
    else
        return (
            <div>
                <h1>now we're talking</h1>
            </div>
        )
}

