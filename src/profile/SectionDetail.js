import React from 'react'

function SectionDetail({pageNum}) {
    return (
        <div className="p-2">
            <h3>
                {`شما در صفحه شماره ${pageNum} هستید`}
            </h3>
        </div>
    )
}

export default SectionDetail
