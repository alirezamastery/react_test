import React, { useState, useEffect } from 'react'

function Filter({ onSelectFilter }) {

    const [keywordSearch, setKeywordSearch] = useState('')

    const handleKeywordSearchChange = (event) => setKeywordSearch(event.target.value)
    const handleFilterChange = () => onSelectFilter(keywordSearch)

    return (
        <div>
            <h3>تنظیمات</h3>
            <label>
                جست و جو
                <input
                    className="form-control rounded-0"
                    type="text"
                    value={keywordSearch}
                    onChange={handleKeywordSearchChange}
                    placeholder="مثلا: گوشی"
                />
            </label>

            <button type="submit" className="btn btn-info btn-block btn-sm rounded-0" onClick={handleFilterChange} >اعمال فیلتر</button>
        </div>
    )
}

export default Filter
