import React from 'react';
import classes from "../myCircleButton/MyCircleButton.module.css"

const MyCircleButton = ({children, icon, ...props}) => {

    return (
        <button {...props} className={classes.myButton}>
            <span> <i className={`icon fa ${icon}`}/> {children} </span>
        </button>
    )
}

export default MyCircleButton;