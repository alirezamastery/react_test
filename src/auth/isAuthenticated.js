import React, { useState, useEffect } from 'react'
import axiosInstance from '../axios';


function IsAuthenticated() {
    const state = axiosInstance.defaults.headers['Authorization'] ? true : false
    return state
}

export default IsAuthenticated
