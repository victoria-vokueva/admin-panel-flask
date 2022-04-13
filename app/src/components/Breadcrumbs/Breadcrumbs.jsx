import React from 'react';
import { useState } from 'react';

const Breadcrumbs = ({ path, onChangePath }) => {

    return (
        <div >
            <nav className="breadcrumbs">
                <ol className="breadcrumb brc-color">
                    {path
                        ? path.map((item, index) =>
                            <li className="breadcrumb-item" onClick={() => onChangePath(item)} key={index} aria-current="page">{item.name}</li>)
                        : null
                    }
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbs;