import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useIsAuthenticated from '../auth/IsAuthenticated';
import axiosInstance from '../axios'



export default function FinalCheck() {
    const history = useHistory();
    const [athenticated, username, loading] = useIsAuthenticated()
    console.log("in FinalCheck: ", athenticated, username, loading)

    // if (!athenticated)    // ---> this part should be fixed
    //     history.push('/login')

    return (
        <div className="container border mt-5 shadow text-center" style={{ height: "500px" }}>
            <div className="p-6">
                {loading ? <h1>در حال پردازش</h1>
                    : <h1>now we're talking</h1>}
            </div>
        </div>
    )
}

