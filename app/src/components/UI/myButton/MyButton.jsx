import React from 'react';
import classes from "../myButton/MyButton.module.css"

const MyButton = ({children, icon, ...props}) => {
//"btn btn-primary mb2 btn-sm"
    return (
        <button {...props} className={classes.myButton}>
            <span> <i className={`icon fa ${icon}`}/> {children} </span>
        </button>
    )
}

export default MyButton;