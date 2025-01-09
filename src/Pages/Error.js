import React from 'react'
import { VscError } from "react-icons/vsc";

function Error() {
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <VscError className='fs-1' />
                <div>Error</div>
                <h3>Page Not Found</h3>
            </div>
        </>
    )
}

export default Error