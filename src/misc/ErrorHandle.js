import React from 'react'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import "./error.css"
function ErrorHandle(props) {
    return (
        <div className="errorContainer">
            <span>{props.message}</span>
            <ErrorOutlineIcon className="errorIcon" />
        </div>
    )
}

export default ErrorHandle
