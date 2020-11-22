import React, { useState, useEffect } from 'react'

function Filter({ onSelectFilter }) {

    const [keywordSearch , setKeywordSearch] = useState('')

    const handleKeywordSearchChange = (event) => setKeywordSearch(event.target.value)
    const handleFilterChange = () => onSelectFilter(keywordSearch)

    return (
        <div>
            <h3>search here:</h3>
            <label>
                جست و جو
                <input type="text" value={keywordSearch} onChange={handleKeywordSearchChange}/>
            </label>
            
            <button type="submit" className="btn btn-info m-1" onClick={handleFilterChange} >اعمال فیلتر</button>
        </div>
    )
}

export default Filter
