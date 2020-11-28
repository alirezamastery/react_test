import React, { useState } from 'react'

import { useAuthDispatch, logout, useAuthState } from '../Context';
import axiosInstance from '../axios'
import Sections from './Sections'
import SectionDetail from './SectionDetail.js'

function Profile() {
    const [page, setPage] = useState(0)

    const handleSectionSelect = (e) => {
        setPage(e.target.id)
    }

    return (
        <div className="container shadow mt-5" >
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3 border p-3" >
                    <Sections selectHandler={handleSectionSelect} />
                </div>
                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 border p-1" >
                    <SectionDetail pageNum={page} />
                </div>
            </div>
        </div>
    )
}

export default Profile
