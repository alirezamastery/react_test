import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './AuthActions'
// import {useAuthDispatch} from '../Context/context'
// import {logout} from '../Context'

export default function Logout() {
	const history = useHistory();

	// const dispatch = useAuthDispatch();
	const dispatch = useDispatch()

	useEffect(() => {
		// axiosInstance.post('user/logout/blacklist/', {
		// 	refresh_token: localStorage.getItem('refresh_token'),
		// });
		logout(dispatch)
		// localStorage.removeItem('access_token');
		// localStorage.removeItem('refresh_token');
		// axiosInstance.defaults.headers['Authorization'] = null;

		history.push('/');
		// window.location.reload()
	});
	return <div>خروج از حساب کاربری</div>;
}